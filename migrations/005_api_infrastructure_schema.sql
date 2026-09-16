create table if not exists user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  token_hash text not null unique,
  device_id uuid references mobile_devices(id) on delete set null,
  ip_address inet,
  user_agent text,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  last_seen_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists file_upload_intents (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  requested_by_user_id uuid references app_users(id) on delete set null,
  file_type text not null check (
    file_type in ('audit_photo', 'action_plan_photo', 'certificate', 'report_pdf', 'other')
  ),
  entity_type text check (
    entity_type in (
      'audit',
      'audit_answer',
      'action_plan',
      'action_plan_document',
      'action_plan_document_item',
      'action_plan_feedback',
      'certificate',
      'report'
    )
  ),
  entity_id uuid,
  storage_provider text not null default 'external',
  storage_bucket text,
  storage_key text not null,
  upload_url text,
  public_file_url text,
  expected_mime_type text,
  expected_size_bytes bigint,
  status text not null default 'created' check (
    status in ('created', 'uploaded', 'attached', 'expired', 'cancelled', 'failed')
  ),
  expires_at timestamptz not null default (now() + interval '30 minutes'),
  stored_file_id uuid references stored_files(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists file_access_events (
  id uuid primary key default gen_random_uuid(),
  file_id uuid references stored_files(id) on delete cascade,
  user_id uuid references app_users(id) on delete set null,
  access_type text not null check (access_type in ('view', 'download', 'upload_confirmed')),
  entity_type text,
  entity_id uuid,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists report_generation_jobs (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  area_id uuid references audit_areas(id) on delete set null,
  cycle_id uuid references audit_cycles(id) on delete set null,
  requested_by_user_id uuid references app_users(id) on delete set null,
  report_type text not null check (
    report_type in ('monthly', 'comparison', 'quarterly', 'semiannual', 'annual', 'general', 'action_plan')
  ),
  status text not null default 'queued' check (
    status in ('queued', 'processing', 'completed', 'failed', 'cancelled')
  ),
  payload jsonb not null default '{}'::jsonb,
  report_id uuid references reports(id) on delete set null,
  error_message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table sync_queue
  add column if not exists processed_at timestamptz,
  add column if not exists result_entity_type text,
  add column if not exists result_entity_id uuid,
  add column if not exists result_payload jsonb not null default '{}'::jsonb,
  add column if not exists retry_count integer not null default 0;

create index if not exists user_sessions_user_idx
  on user_sessions (user_id, expires_at desc)
  where revoked_at is null;

create index if not exists file_upload_intents_status_idx
  on file_upload_intents (status, expires_at);

create index if not exists file_upload_intents_entity_idx
  on file_upload_intents (entity_type, entity_id, created_at desc)
  where entity_type is not null and entity_id is not null;

create index if not exists file_access_events_file_idx
  on file_access_events (file_id, created_at desc);

create index if not exists report_generation_jobs_status_idx
  on report_generation_jobs (status, created_at);

create index if not exists report_generation_jobs_area_cycle_idx
  on report_generation_jobs (area_id, cycle_id, report_type);

create index if not exists sync_queue_processing_idx
  on sync_queue (status, retry_count, created_at);
