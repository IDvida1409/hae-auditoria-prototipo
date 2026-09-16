(function () {
  const DB_NAME = "idauditor-offline";
  const DB_VERSION = 1;
  const OPERATION_STORE = "operations";
  const FILE_STORE = "files";
  const META_STORE = "meta";

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
      };
      request.onsuccess = () => resolve(request.result);
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
    const clientOperationId = operation.clientOperationId || uid("op");
    const payload = {
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
    await requestToPromise(txStore(db, OPERATION_STORE, "readwrite").put(payload));
    return payload;
  }

  async function updateOperation(clientOperationId, patch) {
    const db = await openDb();
    const store = txStore(db, OPERATION_STORE, "readwrite");
    const current = await requestToPromise(store.get(clientOperationId));
    if (!current) return null;
    const next = { ...current, ...patch, updatedAt: nowIso() };
    await requestToPromise(store.put(next));
    return next;
  }

  async function listOperations(status = "pending") {
    const db = await openDb();
    const store = txStore(db, OPERATION_STORE);
    const index = store.index("status_created");
    const range = IDBKeyRange.bound([status, ""], [status, "\uffff"]);
    return requestToPromise(index.getAll(range));
  }

  async function listSyncableOperations() {
    const [pending, failed] = await Promise.all([
      listOperations("pending"),
      listOperations("error")
    ]);
    return [...pending, ...failed].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  async function saveFile(file, metadata = {}) {
    const db = await openDb();
    const localFileId = metadata.localFileId || uid("file");
    const payload = {
      localFileId,
      file,
      fileName: metadata.fileName || file?.name || "evidencia",
      mimeType: metadata.mimeType || file?.type || "application/octet-stream",
      fileSizeBytes: metadata.fileSizeBytes || file?.size || null,
      fileType: metadata.fileType || "audit_photo",
      entityType: metadata.entityType || null,
      entityId: metadata.entityId || null,
      status: "local",
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    await requestToPromise(txStore(db, FILE_STORE, "readwrite").put(payload));
    return payload;
  }

  async function getFile(localFileId) {
    const db = await openDb();
    return requestToPromise(txStore(db, FILE_STORE).get(localFileId));
  }

  async function setMeta(key, value) {
    const db = await openDb();
    await requestToPromise(txStore(db, META_STORE, "readwrite").put({ key, value, updatedAt: nowIso() }));
    return value;
  }

  async function getMeta(key) {
    const db = await openDb();
    const result = await requestToPromise(txStore(db, META_STORE).get(key));
    return result?.value ?? null;
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
    const savedFile = await saveFile(file, metadata);
    const operation = await saveOperation({
      entityType: "stored_file",
      operation: "upload",
      payload: {
        localFileId: savedFile.localFileId,
        fileName: savedFile.fileName,
        mimeType: savedFile.mimeType,
        fileSizeBytes: savedFile.fileSizeBytes,
        fileType: savedFile.fileType,
        entityType: savedFile.entityType,
        entityId: savedFile.entityId
      }
    });
    return { file: savedFile, operation };
  }

  async function syncPending(options = {}) {
    const endpoint = options.endpoint || "/api/sync-queue";
    const operations = await listSyncableOperations();
    if (!operations.length) return { sent: 0, operations: [] };
    if (navigator.onLine === false) return { sent: 0, operations, offline: true };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8", ...(options.headers || {}) },
      body: JSON.stringify({
        operations: operations.map((item) => ({
          clientOperationId: item.clientOperationId,
          entityType: item.entityType,
          entityId: item.entityId,
          operation: item.operation,
          payload: item.payload
        }))
      })
    });

    if (!response.ok) {
      const message = await response.text();
      await Promise.all(operations.map((item) =>
        updateOperation(item.clientOperationId, {
          status: "error",
          retryCount: (item.retryCount || 0) + 1,
          errorMessage: message.slice(0, 500)
        })
      ));
      throw new Error(message || "Falha ao sincronizar fila offline.");
    }

    const result = await response.json();
    const accepted = result.operations || [];
    await Promise.all(accepted.map((item) =>
      updateOperation(item.client_operation_id || item.clientOperationId, {
        status: "synced",
        syncedAt: nowIso(),
        errorMessage: null
      })
    ));

    return { sent: accepted.length, operations: accepted };
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
    queueAuditStart,
    queueAuditAnswer,
    queueActionPlanFeedback,
    queueFileUpload,
    syncPending
  };

  window.addEventListener("online", () => {
    syncPending().catch(() => {});
  });
})();
