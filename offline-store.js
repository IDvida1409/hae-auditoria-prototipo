(function () {
  const DB_NAME = "idauditor-offline";
  const DB_VERSION = 2;
  const OPERATION_STORE = "operations";
  const FILE_STORE = "files";
  const META_STORE = "meta";
  const ENTITY_STORE = "entities";
  let activeSync = null;
  let retryTimer = null;
  let retryDelay = 2000;
  let syncOptions = {};
  let disconnectedSinceLastSync = navigator.onLine === false;

  function userScope() {
    return String(syncOptions.userScope || "anonymous");
  }

  function scopedKey(key) {
    return `${userScope()}:${key}`;
  }

  function committed(transaction) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = resolve;
      transaction.onabort = () => reject(transaction.error || new Error("Falha ao salvar dados locais"));
      transaction.onerror = () => {};
    });
  }

  async function putRecord(storeName, value) {
    const db = await openDb();
    const transaction = db.transaction(storeName, "readwrite");
    const done = committed(transaction);
    transaction.objectStore(storeName).put(value);
    try { await done; } finally { db.close(); }
    return value;
  }

  function emitSync(phase, details = {}) {
    window.dispatchEvent(new CustomEvent("offline:sync-status", { detail: { phase, ...details } }));
  }

  function scheduleSync(delay = 500) {
    clearTimeout(retryTimer);
    retryTimer = setTimeout(() => syncPending().catch(() => {}), delay);
  }

  async function fetchWithTimeout(url, options = {}, timeoutMs = 60000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { credentials: "include", ...options, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  }

  function openDb() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("IndexedDB não está disponível neste dispositivo."));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(OPERATION_STORE)) {
          const operations = db.createObjectStore(OPERATION_STORE, { keyPath: "clientOperationId" });
          operations.createIndex("status_created", ["status", "createdAt"]);
          operations.createIndex("entity_status", ["entityType", "status"]);
        }
        if (!db.objectStoreNames.contains(FILE_STORE)) {
          const files = db.createObjectStore(FILE_STORE, { keyPath: "localFileId" });
          files.createIndex("status_created", ["status", "createdAt"]);
        }
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE, { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains(ENTITY_STORE)) {
          db.createObjectStore(ENTITY_STORE, { keyPath: "key" });
        }
      };
      request.onsuccess = () => {
        request.result.onversionchange = () => request.result.close();
        resolve(request.result);
      };
      request.onerror = () => reject(request.error);
    });
  }

  function txStore(db, storeName, mode = "readonly") {
    return db.transaction(storeName, mode).objectStore(storeName);
  }

  function requestToPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function uid(prefix) {
    if (window.crypto?.randomUUID) return `${prefix}_${window.crypto.randomUUID()}`;
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function nowIso() {
    return new Date().toISOString();
  }

  async function saveOperation(operation) {
    const db = await openDb();
    const transaction = db.transaction([OPERATION_STORE, META_STORE, ENTITY_STORE, FILE_STORE], "readwrite");
    const done = committed(transaction);
    const store = transaction.objectStore(OPERATION_STORE);
    const meta = transaction.objectStore(META_STORE);
    const entities = transaction.objectStore(ENTITY_STORE);
    const clientOperationId = operation.clientOperationId || uid("op");
    const payload = {
      userScope: userScope(),
      clientOperationId,
      entityType: operation.entityType,
      entityId: operation.entityId || null,
      operation: operation.operation || "create",
      payload: operation.payload || {},
      status: "pending",
      retryCount: 0,
      errorMessage: null,
      createdAt: operation.createdAt || nowIso(),
      updatedAt: nowIso(),
      syncedAt: null
    };
    let invalid = null;
    const prior = store.get(clientOperationId);
    prior.onsuccess = () => {
      if (prior.result) {
        invalid = new Error("Operacao local ja existe; use um novo identificador para editar");
        transaction.abort();
        return;
      }
      const sequenceKey = scopedKey("sequence");
      const sequence = meta.get(sequenceKey);
      sequence.onsuccess = () => {
        payload.clientSequence = (sequence.result?.value || 0) + 1;
        meta.put({ key: sequenceKey, value: payload.clientSequence });
        payload.dependsOn = [...new Set(operation.dependsOn || [])];
        const p = payload.payload;
        const auditKey = scopedKey("audit:" + p.localAuditId);
        const audit = entities.get(auditKey);
        audit.onsuccess = () => {
          if ((payload.entityType !== "audit" || payload.operation !== "create") && payload.entityType !== "audit_answer") {
            if (audit.result?.createOperationId) payload.dependsOn.push(audit.result.createOperationId);
            if (audit.result?.lastOperationId) payload.dependsOn.push(audit.result.lastOperationId);
          }
          payload.dependsOn = [...new Set(payload.dependsOn)];
          if (operation.localFileRecord) transaction.objectStore(FILE_STORE).put(operation.localFileRecord);
          store.put(payload);
          if (p.localAuditId) {
            entities.put({ ...audit.result, key: auditKey, userScope: userScope(), localAuditId: p.localAuditId,
              ...(payload.entityType === "audit" && payload.operation === "create" ? { ...p, createOperationId: clientOperationId } : {}),
              lastOperationId: clientOperationId, updatedAt: nowIso() });
          }
          if (payload.entityType === "audit_answer") {
            entities.put({ key: scopedKey("answer:" + p.localAuditId + ":" + p.questionId), userScope: userScope(), ...p, operationId: clientOperationId, updatedAt: nowIso() });
          }
        };
      };
    };
    try { await done; } catch (error) { throw invalid || error; } finally { db.close(); }
    emitSync("saved", { clientOperationId });
    scheduleSync();
    return payload;
  }

  async function updateOperation(clientOperationId, patch) {
    const db = await openDb();
    const transaction = db.transaction(OPERATION_STORE, "readwrite");
    const done = committed(transaction);
    const store = transaction.objectStore(OPERATION_STORE);
    let next = null;
    const request = store.get(clientOperationId);
    request.onsuccess = () => {
      if (!request.result) return;
      next = { ...request.result, ...patch, updatedAt: nowIso() };
      store.put(next);
    };
    try { await done; } finally { db.close(); }
    return next;
  }

  async function listOperations(status = "pending") {
    const db = await openDb();
    const store = txStore(db, OPERATION_STORE);
    const index = store.index("status_created");
    const range = IDBKeyRange.bound([status, ""], [status, "\uffff"]);
    try {
      const rows = await requestToPromise(index.getAll(range));
      return rows.filter((row) => row.userScope === userScope());
    } finally { db.close(); }
  }

  async function listSyncableOperations() {
    const [pending, failed] = await Promise.all([
      listOperations("pending"),
      listOperations("error")
    ]);
    return [...pending, ...failed].sort((a, b) => (a.clientSequence || 0) - (b.clientSequence || 0) || a.createdAt.localeCompare(b.createdAt));
  }

  function fileRecord(file, metadata = {}) {
    const localFileId = metadata.localFileId || uid("file");
    const payload = {
      userScope: userScope(),
      localFileId,
      file,
      fileName: metadata.fileName || file?.name || "evidencia",
      mimeType: metadata.mimeType || file?.type || "application/octet-stream",
      fileSizeBytes: metadata.fileSizeBytes || file?.size || null,
      fileType: metadata.fileType || "audit_photo",
      entityType: metadata.entityType || null,
      entityId: metadata.entityId || null,
      localAuditId: metadata.localAuditId || null,
      questionId: metadata.questionId || null,
      status: "local",
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    return payload;
  }

  async function saveFile(file, metadata = {}) {
    return putRecord(FILE_STORE, fileRecord(file, metadata));
  }

  async function getFile(localFileId) {
    const db = await openDb();
    try {
      const file = await requestToPromise(txStore(db, FILE_STORE).get(localFileId));
      return file?.userScope === userScope() ? file : null;
    } finally { db.close(); }
  }

  async function setMeta(key, value) {
    await putRecord(META_STORE, { key, value, updatedAt: nowIso() });
    return value;
  }

  async function getMeta(key) {
    const db = await openDb();
    try {
      const result = await requestToPromise(txStore(db, META_STORE).get(key));
      return result?.value ?? null;
    } finally { db.close(); }
  }

  async function queueAuditStart(payload) {
    return saveOperation({ entityType: "audit", operation: "create", payload });
  }

  async function queueAuditAnswer(payload) {
    return saveOperation({ entityType: "audit_answer", operation: "upsert", payload });
  }

  async function queueActionPlanFeedback(payload) {
    return saveOperation({ entityType: "action_plan_feedback", operation: "create", payload });
  }

  async function queueFileUpload(file, metadata = {}) {
    const savedFile = fileRecord(file, metadata);
    const operation = await saveOperation({
      localFileRecord: savedFile,
      entityType: "stored_file",
      operation: "upload",
      dependsOn: metadata.dependsOn || [],
      payload: {
        localFileId: savedFile.localFileId,
        fileName: savedFile.fileName,
        mimeType: savedFile.mimeType,
        fileSizeBytes: savedFile.fileSizeBytes,
        fileType: savedFile.fileType,
        entityType: savedFile.entityType,
        entityId: savedFile.entityId,
        localAuditId: metadata.localAuditId || null,
        auditId: metadata.auditId || null,
        questionId: metadata.questionId || null,
        caption: metadata.caption || null
      }
    });
    return { file: savedFile, operation };
  }

  async function getAuditSnapshot(localAuditId) {
    const db = await openDb();
    try {
      const records = await requestToPromise(txStore(db, ENTITY_STORE).getAll());
      const files = await requestToPromise(txStore(db, FILE_STORE).getAll());
      return {
        audit: records.find((item) => item.key === scopedKey("audit:" + localAuditId)) || null,
        answers: records.filter((item) => item.key.startsWith(scopedKey("answer:" + localAuditId + ":"))),
        files: files.filter((item) => item.userScope === userScope() && item.localAuditId === localAuditId)
      };
    } finally { db.close(); }
  }

  async function configure(options = {}) {
    if (options.backendUrl != null) {
      const url = new URL(options.backendUrl || location.origin);
      if (!["https:", "http:"].includes(url.protocol)) throw new Error("Endereco de backend invalido");
      await setMeta("backendUrl", url.href.replace(/\/$/, ""));
    }
    syncOptions = { ...syncOptions, ...options };
    scheduleSync();
  }

  async function localEntity(key) {
    const db = await openDb();
    try { return await requestToPromise(txStore(db, ENTITY_STORE).get(scopedKey(key))); } finally { db.close(); }
  }

  async function patchEntity(key, patch, expectedOperationId = null) {
    const db = await openDb();
    const transaction = db.transaction(ENTITY_STORE, "readwrite");
    const done = committed(transaction);
    const store = transaction.objectStore(ENTITY_STORE);
    const storageKey = scopedKey(key);
    const request = store.get(storageKey);
    request.onsuccess = () => {
      if (request.result && (!expectedOperationId || request.result.operationId === expectedOperationId)) store.put({ ...request.result, ...patch });
    };
    try { await done; } finally { db.close(); }
  }

  async function deviceUid() {
    const db = await openDb();
    const transaction = db.transaction(META_STORE, "readwrite");
    const done = committed(transaction);
    const store = transaction.objectStore(META_STORE);
    let value;
    const key = scopedKey("deviceUid");
    const request = store.get(key);
    request.onsuccess = () => {
      value = request.result?.value || uid("device");
      store.put({ key, value });
    };
    try { await done; } finally { db.close(); }
    return value;
  }

  async function cacheBootstrap(payload) {
    await setMeta(scopedKey("bootstrap"), payload);
    if (navigator.storage?.persist) await navigator.storage.persist().catch(() => false);
    return payload;
  }

  async function runSync(options) {
    const operations = await listSyncableOperations();
    if (!operations.length) { emitSync("idle", { pending: 0 }); return { sent: 0, pending: 0 }; }
    if (navigator.onLine === false) { emitSync("offline", { pending: operations.length }); return { sent: 0, pending: operations.length, offline: true }; }
    const configured = options.backendUrl || await getMeta("backendUrl");
    if (!configured && (location.protocol === "file:" || window.Capacitor?.isNativePlatform?.() || document.body.classList.contains("android-app"))) {
      emitSync("unconfigured", { pending: operations.length });
      return { sent: 0, pending: operations.length, unconfigured: true };
    }
    const base = configured || location.origin;
    const device = await deviceUid();
    const headers = { ...(typeof options.headers === "function" ? options.headers() : options.headers || {}) };
    emitSync("syncing", { pending: operations.length, sent: 0, recovered: disconnectedSinceLastSync });
    let sent = 0;
    let failed = false;
    const reconciled = [];
    for (let offset = 0; offset < operations.length; offset += 50) {
      const batch = operations.slice(offset, offset + 50);
      for (const operation of batch) {
        if (operation.entityType === "audit_answer" && operation.dependsOn?.length) {
          operation.dependsOn = [];
          await updateOperation(operation.clientOperationId, { dependsOn: [] });
        }
      }
      for (const op of batch) {
        if (op.entityType !== "stored_file") continue;
        const file = await getFile(op.payload.localFileId);
        if (!file?.file) throw new Error("Foto local nao encontrada; os dados pendentes foram mantidos");
        if (!file.serverId) {
          const upload = await fetchWithTimeout(base + "/api/offline-files", {
            method: "POST",
            headers: { ...headers, "content-type": file.mimeType, "x-device-uid": device,
              "x-local-file-id": file.localFileId, "x-file-type": file.fileType, "x-file-name": encodeURIComponent(file.fileName) },
            body: file.file
          }, 120000);
          if (!upload.ok) throw new Error("Falha ao enviar foto: " + upload.status);
          const result = await upload.json();
          if (!result.file?.id) throw new Error("Servidor nao confirmou o arquivo");
          await putRecord(FILE_STORE, { ...file, serverId: result.file.id, status: "uploaded", updatedAt: nowIso() });
        }
      }
      const response = await fetchWithTimeout(base + "/api/sync-queue", {
        method: "POST",
        headers: { ...headers, "content-type": "application/json" },
        body: JSON.stringify({ deviceUid: device, operations: batch.map((item) => ({
          clientOperationId: item.clientOperationId, clientSequence: item.clientSequence,
          entityType: item.entityType, operation: item.operation, payload: item.payload, dependsOn: item.dependsOn || []
        })) })
      }, 60000);
      if (!response.ok) {
        const failure = await response.json().catch(() => ({}));
        throw new Error(failure.error || "Falha ao sincronizar: " + response.status);
      }
      const result = await response.json();
      const received = new Map((result.operations || []).map((row) => [row.client_operation_id, row]));
      for (const local of batch) {
        const remote = received.get(local.clientOperationId);
        if (remote && ["synced", "ignored"].includes(remote.status)) {
          await updateOperation(local.clientOperationId, { status: remote.status, syncedAt: nowIso(), errorMessage: null, serverResult: remote.result_payload });
          if (local.payload.localAuditId) {
            const key = "audit:" + local.payload.localAuditId;
            if (remote.result_payload?.entityType === "audit") await patchEntity(key, { serverId: remote.result_entity_id, serverSnapshot: remote.result_payload.audit });
          }
          if (local.entityType === "audit_answer") await patchEntity("answer:" + local.payload.localAuditId + ":" + local.payload.questionId, { serverId: remote.result_entity_id, serverRevision: remote.result_payload?.answer?.revision });
          if (local.entityType === "stored_file") {
            const file = await getFile(local.payload.localFileId);
            await putRecord(FILE_STORE, { ...file, status: "synced" });
          }
          reconciled.push(remote.result_payload);
          sent++;
        } else {
          failed = true;
          await updateOperation(local.clientOperationId, { status: "error", retryCount: local.retryCount + 1, errorMessage: remote?.error_message || "Operacao ainda nao aplicada no servidor" });
        }
      }
      emitSync("syncing", { sent, pending: operations.length - sent, recovered: disconnectedSinceLastSync });
    }
    const remaining = await listSyncableOperations();
    if (reconciled.length) window.dispatchEvent(new CustomEvent("offline:sync-complete", { detail: { results: reconciled, sent, pending: remaining.length } }));
    emitSync(remaining.length ? "pending" : "synced", {
      sent,
      pending: remaining.length,
      recovered: !remaining.length && disconnectedSinceLastSync
    });
    if (remaining.length) {
      scheduleSync(retryDelay);
      retryDelay = Math.min(retryDelay * 2, 300000);
    } else {
      retryDelay = 2000;
      disconnectedSinceLastSync = false;
    }
    return { sent, pending: remaining.length, failed };
  }

  function syncPending(options = {}) {
    if (activeSync) return activeSync;
    activeSync = runSync({ ...syncOptions, ...options }).catch(async (error) => {
      emitSync("error", { message: error.message, pending: (await listSyncableOperations()).length });
      if (navigator.onLine !== false) {
        scheduleSync(retryDelay);
        retryDelay = Math.min(retryDelay * 2, 300000);
      }
      throw error;
    }).finally(() => { activeSync = null; });
    return activeSync;
  }

  async function resolveConflict(clientOperationId, strategy) {
    if (activeSync) await activeSync.catch(() => {});
    const local = (await listOperations("error")).find((operation) => operation.clientOperationId === clientOperationId);
    if (!local) throw new Error("Operacao local em conflito nao encontrada");
    const base = syncOptions.backendUrl || await getMeta("backendUrl") || location.origin;
    const headers = typeof syncOptions.headers === "function" ? syncOptions.headers() : syncOptions.headers || {};
    const response = await fetchWithTimeout(base + "/api/sync-queue/" + encodeURIComponent(clientOperationId) + "/resolve", {
      method: "POST", headers: { ...headers, "content-type": "application/json" },
      body: JSON.stringify({ deviceUid: await deviceUid(), strategy })
    }, 60000);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Falha ao resolver conflito");
    await updateOperation(clientOperationId, { status: "ignored", serverResult: result.original.result_payload, errorMessage: null });
    const replacement = result.replacement;
    if (replacement) {
      await putRecord(OPERATION_STORE, {
        clientOperationId: replacement.client_operation_id, clientSequence: replacement.client_sequence,
        entityType: replacement.entity_type, operation: replacement.operation, payload: replacement.payload,
        dependsOn: replacement.depends_on, status: replacement.status, retryCount: replacement.retry_count,
        createdAt: replacement.created_at, updatedAt: nowIso(), serverResult: replacement.result_payload,
        errorMessage: replacement.error_message, syncedAt: replacement.synced_at
      });
    }
    const final = replacement?.status === "synced" ? replacement.result_payload : result.original.result_payload;
    if (final?.answer) await patchEntity("answer:" + local.payload.localAuditId + ":" + local.payload.questionId, {
      answer: final.answer.answer, notes: final.answer.notes,
      serverId: final.entityId, serverRevision: final.answer.revision
    }, clientOperationId);
    window.dispatchEvent(new CustomEvent("offline:sync-complete", { detail: { results: [final], conflictResolved: true } }));
    scheduleSync();
    return result;
  }

  window.HAE_OFFLINE = {
    openDb,
    uid,
    saveOperation,
    listOperations,
    listSyncableOperations,
    updateOperation,
    saveFile,
    getFile,
    setMeta,
    getMeta,
    deviceUid,
    queueAuditStart,
    queueAuditAnswer,
    queueActionPlanFeedback,
    queueFileUpload,
    syncPending,
    configure,
    resolveConflict,
    getAuditSnapshot,
    localEntity,
    cacheBootstrap,
    getCachedBootstrap: () => getMeta(scopedKey("bootstrap")),
    queueAuditFinalize: (payload) => saveOperation({ entityType: "audit", operation: "finalize", payload })
  };

  window.addEventListener("online", () => {
    syncPending().catch(() => {});
  });
  window.addEventListener("offline", () => {
    disconnectedSinceLastSync = true;
    clearTimeout(retryTimer);
    emitSync("offline");
  });
  window.addEventListener("pageshow", () => scheduleSync());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") scheduleSync();
  });
})();
