# Backend: implemented infrastructure and remaining acceptance work

## Scope

Backend work precedes UI connections, access rules, action-plan policies and the login screen.
The existing unauthenticated prototype identity fallback is still present. Production access
control is not approved or implemented by this infrastructure milestone.

## Implemented

- Migration 006 adds queue operation types, device ordering, dependencies, answer revisions and
  idempotent device/local-file identity.
- Sync receipts are not completion acknowledgements. The server applies each operation and
  its acknowledgement in one transaction. Failures retain an error and remain retryable.
- Audit creation, answer updates, finalization, audit-photo links and text feedback have handlers.
- The queue detects retransmissions with altered payloads.
- Offline answers and their operation are committed together locally. Photos and their operation
  are also committed together. A local save is reported only after the IndexedDB transaction commits.
- The IndexedDB upgrade preserves version-1 stores. Cached bootstrap, audit snapshots, photos
  and operation ordering are available through HAE_OFFLINE.
- Automatic attempts run on reconnect, pageshow, foreground and after local saves. Failures use
  bounded backoff and request timeouts. Only server-applied operations become synced locally.
- Events offline:sync-status and offline:sync-complete expose progress and server results for
  the later UI integration. They do not update the existing prototype screens themselves.
- Binary files use private content-addressed disk storage with checksums, a 15 MB limit and
  device/local-file deduplication. Interrupted uploads keep the local original.
- Bootstrap for offline use includes real checklist/block/question IDs. Users, audit history,
  dashboard aggregates and notification-reading APIs are available.

## Deployment requirements

1. Configure DATABASE_URL and apply migrations; import real checklists.
   Run npm run db:migrate and then npm run db:import-checklist.
   Backend startup uses the same migration runner, with a PostgreSQL advisory lock
   so simultaneous server instances cannot apply the same migration concurrently.
2. Configure FILE_STORAGE_DIR to a persistent private volume and back it up with the database.
   The free Render configuration does not provide durable file storage by itself.
3. Configure the APK with HAE_OFFLINE.configure({ backendUrl: "https://backend-host" }).
   An unconfigured APK retains pending data and reports unconfigured, rather than sending to localhost.
4. Set CORS_ORIGINS for additional approved web origins. Capacitor localhost origins are included.
5. Run end-to-end PostgreSQL and Android acceptance before claiming offline is ready.

## Still pending

- Definitive deployment verification and checklist import in the hosted database.
- Real-device IndexedDB tests: upgrade, restart, storage exhaustion and loss of connectivity
  during local writes, photo uploads, response receipts and server processing.
- UI calls to local-save APIs; progress messages and refresh/reconciliation after sync.
- Answer/photo conflict-resolution UI and manual retry after validation conflicts.
- Access checks, real password authentication, session lifecycle and assignment rules.
- Action-plan document generation, delivery, acknowledgement, review events and impact policies.
  Offline finalization intentionally does not invent these policies or generate plans.
- Offline evidence attachments for action-plan feedback (only audit-photo linking is implemented).
- Hosted report-browser installation and worker activation after access control is implemented.
- Remaining business notification events; report-ready notification is implemented.
- Object-storage adapter if private persistent disk is not selected.
- Backup/restore rehearsal, concurrency/load tests and operational monitoring.
- Historical queue entries marked synced by the previous receipt-only processor must be
  reviewed before migration; their business data cannot be assumed applied.

## Verification

npm run test:postgres passed with isolated real PostgreSQL: all migrations, 12 areas,
437 questions, user/session APIs, offline operation processing, real photo upload/download,
idempotent retransmission, answer conflict resolution, audit finalization, settings and
document APIs, actual PDF generation, report artifact history and report-ready notification.

The Render test service has a 1 GB persistent disk mounted at /var/data. FILE_STORAGE_DIR
is configured as /var/data/uploads. New structured APIs and the worker stay inactive on
Render unless STRUCTURED_APIS_ENABLED=true. This is not production authentication;
do not enable them on a public service until prototype identity fallback is removed.
The existing panel /api/state flow remains a test prototype and must not contain real data.

npm run check checks JavaScript syntax, including backend modules and offline storage.
npm run test:backend verifies transaction failure handling, dependency acknowledgement,
idempotent retries, revision conflicts, input boundaries and actual binary storage.
These tests use database doubles; they do not establish PostgreSQL integration correctness.

node tools/verify-offline-storage.js was also exercised with real Chromium IndexedDB
and a simulated API: offline save, persisted photos, reload recovery, failed response
retry, dependency ordering and completed local synchronization.
