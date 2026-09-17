const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { Transform } = require("node:stream");
const { pipeline } = require("node:stream/promises");

const storageDir = path.resolve(process.env.FILE_STORAGE_DIR || path.join(__dirname, "..", "data", "uploads"));
const maxFileBytes = 15 * 1024 * 1024;
const mimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

function storedPath(key) {
  if (!/^[a-f0-9]{64}$/.test(key || "")) throw new Error("Chave de arquivo invalida");
  return path.join(storageDir, key);
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
  if (declared > maxFileBytes) throw new Error("Arquivo excede 15 MB");
  await fsp.mkdir(storageDir, { recursive: true });
  const temporary = path.join(storageDir, "upload-" + crypto.randomUUID());
  const digest = crypto.createHash("sha256");
  let size = 0;
  const meter = new Transform({
    transform(chunk, encoding, callback) {
      size += chunk.length;
      if (size > maxFileBytes) return callback(new Error("Arquivo excede 15 MB"));
      digest.update(chunk);
      callback(null, chunk);
    }
  });
  try {
    await pipeline(request, meter, fs.createWriteStream(temporary, { flags: "wx" }));
    if (!size) throw new Error("Arquivo vazio");
    const checksum = digest.digest("hex");
    const client = await pool.connect();
    try {
      await client.query("begin");
      await client.query("select pg_advisory_xact_lock(hashtextextended($1,0))", [device.id + ":" + localFileId]);
      const prior = await client.query("select * from stored_files where device_id=$1 and local_file_id=$2", [device.id, localFileId]);
      if (prior.rows[0]) {
        if (prior.rows[0].checksum !== checksum) throw new Error("Arquivo reenviado com conteudo diferente");
        await client.query("commit");
        return prior.rows[0];
      }
      // Content-addressed immutable files make interrupted database writes safe to retry.
      await fsp.copyFile(temporary, storedPath(checksum));
      const saved = await client.query(
        "insert into stored_files (unit_id,uploaded_by_user_id,device_id,local_file_id,file_type,storage_provider,storage_key,original_filename,mime_type,file_size_bytes,checksum) values ($1,$2,$3,$4,$5,'local_private',$6,$7,$8,$9,$6) returning *",
        [unitId, user.id, device.id, localFileId, fileType, checksum, filename.slice(0, 255), mimeType, size]
      );
      await client.query("commit");
      return saved.rows[0];
    } catch (error) { await client.query("rollback"); throw error; }
    finally { client.release(); }
  } finally { await fsp.unlink(temporary).catch(() => {}); }
}

async function download(pool, request, response, user, id) {
  const result = await pool.query("select * from stored_files where id=$1 and uploaded_by_user_id=$2 and storage_provider='local_private'", [id, user.id]);
  const file = result.rows[0];
  if (!file) return false;
  const filename = storedPath(file.storage_key);
  await fsp.access(filename);
  response.writeHead(200, {
    "content-type": file.mime_type,
    "content-length": file.file_size_bytes,
    "content-disposition": "attachment; filename*=UTF-8''" + encodeURIComponent(file.original_filename),
    "cache-control": "private, no-store",
    "x-content-type-options": "nosniff"
  });
  await pipeline(fs.createReadStream(filename), response);
  return true;
}

module.exports = { upload, download, storedPath, maxFileBytes };
