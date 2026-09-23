const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { Transform } = require("node:stream");
const { pipeline } = require("node:stream/promises");

const storageDir = path.resolve(process.env.FILE_STORAGE_DIR || path.join(__dirname, "..", "data", "uploads"));
const maxFileBytes = 50 * 1024 * 1024;
const mimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

function detectedMimeType(header) {
  if (header.length >= 3 && header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) return "image/jpeg";
  if (header.length >= 8 && header.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (header.length >= 12 && header.subarray(0, 4).toString("ascii") === "RIFF" && header.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  if (header.length >= 5 && header.subarray(0, 5).toString("ascii") === "%PDF-") return "application/pdf";
  return null;
}

function validFileStructure(contents, mimeType) {
  if (mimeType === "image/jpeg") return contents.length >= 4 && contents.subarray(-2).equals(Buffer.from([0xff, 0xd9]));
  if (mimeType === "image/png") return contents.length >= 24 && contents.subarray(12, 16).toString("ascii") === "IHDR" && contents.subarray(-8, -4).toString("ascii") === "IEND";
  if (mimeType === "image/webp") {
    const chunk = contents.subarray(12, 16).toString("ascii");
    return contents.length >= 20 && contents.readUInt32LE(4) + 8 === contents.length && ["VP8 ", "VP8L", "VP8X"].includes(chunk);
  }
  if (mimeType === "application/pdf") return contents.length >= 8 && contents.subarray(-2048).includes(Buffer.from("%%EOF"));
  return false;
}

function storedPath(key) {
  if (!/^[a-f0-9]{64}$/.test(key || "")) throw new Error("Chave de arquivo invalida");
  return path.join(storageDir, key);
}

async function storeBuffer(contents, key) {
  const destination = storedPath(key);
  await fsp.mkdir(storageDir, { recursive: true });
  try {
    const existing = await fsp.stat(destination);
    if (existing.size !== contents.length) throw new Error("Arquivo existente difere do conteúdo informado");
    return destination;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const temporary = path.join(storageDir, `write-${crypto.randomUUID()}`);
  try {
    await fsp.writeFile(temporary, contents, { flag: "wx" });
    await fsp.rename(temporary, destination);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  } finally {
    await fsp.unlink(temporary).catch(() => {});
  }
  return destination;
}

async function migrateReportFiles(pool) {
  const client = await pool.connect();
  let locked = false;
  let migrated = 0;
  try {
    const lock = await client.query("select pg_try_advisory_lock(hashtextextended('idauditor-report-file-migration',0)) as locked");
    locked = Boolean(lock.rows[0]?.locked);
    if (!locked) return 0;

    while (true) {
      const legacy = await client.query(
        `select f.id,s.contents
           from stored_files f
           join stored_file_contents s on s.file_id=f.id
          where f.file_type='report_pdf' and f.storage_provider='local_private'
          order by f.created_at,f.id
          limit 1`
      );
      if (!legacy.rows[0]) break;
      const contents = legacy.rows[0].contents;
      const checksum = crypto.createHash("sha256").update(contents).digest("hex");
      await storeBuffer(contents, checksum);
      try {
        await client.query("begin");
        const current = await client.query("select storage_provider from stored_files where id=$1 for update", [legacy.rows[0].id]);
        if (current.rows[0]?.storage_provider === "local_private") {
          await client.query("update stored_files set storage_provider='render_disk',storage_key=$2,checksum=$2,file_size_bytes=$3 where id=$1", [legacy.rows[0].id, checksum, contents.length]);
          await client.query("delete from stored_file_contents where file_id=$1", [legacy.rows[0].id]);
          migrated += 1;
        }
        await client.query("commit");
      } catch (error) {
        await client.query("rollback").catch(() => {});
        throw error;
      }
    }
    return migrated;
  } finally {
    if (locked) await client.query("select pg_advisory_unlock(hashtextextended('idauditor-report-file-migration',0))").catch(() => {});
    client.release();
  }
}

async function upload(pool, request, user, device, unitId) {
  const localFileId = String(request.headers["x-local-file-id"] || "");
  if (!localFileId || localFileId.length > 200) throw new Error("x-local-file-id obrigatorio");
  const mimeType = String(request.headers["content-type"] || "").split(";")[0];
  if (!mimeTypes.has(mimeType)) throw new Error("Formato de arquivo nao permitido");
  const filename = path.basename(decodeURIComponent(String(request.headers["x-file-name"] || "evidencia")));
  const fileType = String(request.headers["x-file-type"] || "audit_photo");
  if (!["audit_photo", "action_plan_photo", "certificate", "report_pdf", "other"].includes(fileType)) throw new Error("Tipo de arquivo invalido");
  const declared = Number(request.headers["content-length"]);
  if (declared > maxFileBytes) throw new Error("Arquivo excede 50 MB");
  await fsp.mkdir(storageDir, { recursive: true });
  const temporary = path.join(storageDir, "upload-" + crypto.randomUUID());
  const digest = crypto.createHash("sha256");
  let size = 0;
  let header = Buffer.alloc(0);
  const meter = new Transform({
    transform(chunk, encoding, callback) {
      size += chunk.length;
      if (size > maxFileBytes) return callback(new Error("Arquivo excede 50 MB"));
      if (header.length < 16) header = Buffer.concat([header, chunk]).subarray(0, 16);
      digest.update(chunk);
      callback(null, chunk);
    }
  });
  try {
    await pipeline(request, meter, fs.createWriteStream(temporary, { flags: "wx" }));
    if (!size) throw new Error("Arquivo vazio");
    const contents = await fsp.readFile(temporary);
    const detected = detectedMimeType(header);
    if (!detected || detected !== mimeType || !validFileStructure(contents, detected)) throw new Error("O conteúdo do arquivo não corresponde a um arquivo válido do formato informado");
    if (["audit_photo", "action_plan_photo"].includes(fileType) && !detected.startsWith("image/")) throw new Error("A evidência precisa ser uma foto JPG, PNG ou WebP válida");
    if (fileType === "report_pdf" && detected !== "application/pdf") throw new Error("O relatório precisa ser um PDF válido");
    const checksum = digest.digest("hex");
    const client = await pool.connect();
    try {
      await client.query("begin");
      await client.query("select pg_advisory_xact_lock(hashtextextended($1,0))", [device.id + ":" + localFileId]);
      const prior = await client.query("select * from stored_files where device_id=$1 and local_file_id=$2", [device.id, localFileId]);
      if (prior.rows[0]) {
        if (prior.rows[0].checksum !== checksum) throw new Error("Arquivo reenviado com conteudo diferente");
        await client.query("insert into stored_file_contents (file_id,contents) values ($1,$2) on conflict (file_id) do nothing", [prior.rows[0].id, contents]);
        await client.query("commit");
        return prior.rows[0];
      }
      const saved = await client.query(
        "insert into stored_files (unit_id,uploaded_by_user_id,device_id,local_file_id,file_type,storage_provider,storage_key,original_filename,mime_type,file_size_bytes,checksum) values ($1,$2,$3,$4,$5,'local_private',$6,$7,$8,$9,$6) returning *",
        [unitId, user.id, device.id, localFileId, fileType, checksum, filename.slice(0, 255), mimeType, size]
      );
      await client.query("insert into stored_file_contents (file_id,contents) values ($1,$2)", [saved.rows[0].id, contents]);
      await client.query(
        "insert into activity_logs (unit_id,actor_user_id,entity_type,entity_id,action,metadata) values ($1,$2,'stored_file',$3,'file.uploaded',$4::jsonb)",
        [unitId, user.id, saved.rows[0].id, JSON.stringify({ fileType, mimeType, size, checksum })]
      );
      await client.query("commit");
      return saved.rows[0];
    } catch (error) { await client.query("rollback"); throw error; }
    finally { client.release(); }
  } finally { await fsp.unlink(temporary).catch(() => {}); }
}

async function download(pool, request, response, user, id) {
  const result = await pool.query(
    `select f.* from stored_files f where f.id=$1 and f.storage_provider in ('local_private','render_disk') and (
       f.uploaded_by_user_id=$2 or $3::boolean or exists(
         select 1 from reports r where r.pdf_file_id=f.id and r.area_id=any($4::uuid[])
       ) or exists(
         select 1 from file_links fl
         join audit_answers aa on aa.id=fl.entity_id and fl.entity_type='audit_answer'
         join audits a on a.id=aa.audit_id
         where fl.file_id=f.id and a.area_id=any($4::uuid[])
       ) or exists(
         select 1 from action_plan_feedback feedback
         join action_plans plan on plan.id=feedback.action_plan_id
         where (feedback.evidence_file_id=f.id or feedback.response_file_id=f.id or f.id=any(feedback.response_file_ids))
           and plan.area_id=any($4::uuid[])
       )
     )`,
    [id, user.id, Boolean(user.all_areas), user.area_ids || []]
  );
  const file = result.rows[0];
  if (!file) return false;
  let contents;
  if (file.storage_provider === "render_disk") {
    contents = await fsp.readFile(storedPath(file.storage_key)).catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
  } else {
    const stored = await pool.query("select contents from stored_file_contents where file_id=$1", [file.id]);
    contents = stored.rows[0]?.contents;
  }
  if (!contents) return false;
  await pool.query(
    "insert into file_access_events (file_id,user_id,access_type,ip_address,user_agent) values ($1,$2,'view',$3,$4)",
    [file.id, user.id, request.socket?.remoteAddress || null, String(request.headers["user-agent"] || "").slice(0, 512)]
  );
  response.writeHead(200, {
    "content-type": file.mime_type,
    "content-length": contents.length,
    "content-disposition": "inline; filename*=UTF-8''" + encodeURIComponent(file.original_filename),
    "cache-control": "private, no-store",
    "x-content-type-options": "nosniff"
  });
  response.end(contents);
  return true;
}

module.exports = { upload, download, migrateReportFiles, storeBuffer, storedPath, maxFileBytes, detectedMimeType, validFileStructure };
