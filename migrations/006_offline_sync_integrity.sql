alter table sync_queue drop constraint if exists sync_queue_operation_check;
alter table sync_queue add constraint sync_queue_operation_check
  check (operation in ('create', 'update', 'delete', 'upload', 'upsert', 'finalize'));

alter table sync_queue
  add column if not exists client_sequence bigint,
  add column if not exists depends_on text[] not null default '{}',
  add column if not exists received_at timestamptz not null default now();

create index if not exists sync_queue_device_order_idx
  on sync_queue (device_id, client_sequence, created_at);

alter table audit_answers
  add column if not exists revision integer not null default 1;

alter table stored_files
  add column if not exists device_id uuid references mobile_devices(id),
  add column if not exists local_file_id text;

create unique index if not exists stored_files_device_local_idx
  on stored_files (device_id, local_file_id)
  where device_id is not null and local_file_id is not null;

create table if not exists file_operation_links (
  operation_id uuid not null references sync_queue(id) on delete cascade,
  file_id uuid not null references stored_files(id) on delete cascade,
  primary key (operation_id, file_id)
);
