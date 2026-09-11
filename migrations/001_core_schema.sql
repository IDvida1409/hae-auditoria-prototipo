create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  document_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  name text not null,
  code text,
  address text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units(id) on delete set null,
  full_name text not null,
  email text not null,
  password_hash text,
  role text not null default 'auditor' check (
    role in ('admin', 'quality', 'auditor', 'area_responsible', 'restaurant_responsible', 'viewer')
  ),
  active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists app_users_email_unique_idx on app_users (lower(email));

create table if not exists audit_areas (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  responsible_user_id uuid references app_users(id) on delete set null,
  name text not null,
  slug text not null,
  area_type text not null default 'hospital_area' check (
    area_type in ('hospital_area', 'internal_restaurant', 'third_party_restaurant')
  ),
  operator_name text,
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (unit_id, slug)
);

create table if not exists area_members (
  id uuid primary key default gen_random_uuid(),
  area_id uuid not null references audit_areas(id) on delete cascade,
  user_id uuid not null references app_users(id) on delete cascade,
  responsibility text not null default 'responsible',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (area_id, user_id, responsibility)
);

create table if not exists checklists (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units(id) on delete set null,
  name text not null,
  version_label text not null,
  legal_base text,
  active_from date,
  active_until date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (unit_id, name, version_label)
);

create table if not exists checklist_blocks (
  id uuid primary key default gen_random_uuid(),
  checklist_id uuid not null references checklists(id) on delete cascade,
  title text not null,
  display_order integer not null default 0,
  weight numeric(8, 4) not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists checklist_questions (
  id uuid primary key default gen_random_uuid(),
  block_id uuid not null references checklist_blocks(id) on delete cascade,
  question_number integer not null,
  requirement_text text not null,
  legal_reference text,
  risk_level text not null default 'low' check (
    risk_level in ('low', 'moderate', 'medium', 'high', 'critical')
  ),
  answer_options jsonb not null default '["C", "NC", "X"]'::jsonb,
  required_evidence_on_nc boolean not null default true,
  weight numeric(8, 4) not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (block_id, question_number)
);

create table if not exists mobile_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id) on delete set null,
  device_uid text not null,
  device_name text,
  platform text not null default 'android' check (platform in ('android', 'ios', 'web')),
  app_version text,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  unique (device_uid)
);

create table if not exists audit_cycles (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  month_start date not null,
  label text not null,
  previous_cycle_id uuid references audit_cycles(id) on delete set null,
  status text not null default 'open' check (status in ('open', 'closed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (unit_id, month_start)
);

create table if not exists audits (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  area_id uuid not null references audit_areas(id) on delete restrict,
  checklist_id uuid not null references checklists(id) on delete restrict,
  cycle_id uuid not null references audit_cycles(id) on delete restrict,
  auditor_user_id uuid references app_users(id) on delete set null,
  device_id uuid references mobile_devices(id) on delete set null,
  local_audit_id text,
  source text not null default 'web' check (source in ('web', 'tablet_android', 'tablet_ios', 'import')),
  status text not null default 'draft' check (
    status in ('draft', 'in_progress', 'finished', 'cancelled', 'sync_pending', 'sync_error')
  ),
  started_at timestamptz,
  finished_at timestamptz,
  final_score numeric(5, 2),
  offline_created boolean not null default false,
  sync_status text not null default 'synced' check (sync_status in ('pending', 'synced', 'error')),
  sync_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists audits_device_local_unique_idx
  on audits (device_id, local_audit_id)
  where device_id is not null and local_audit_id is not null;

create table if not exists audit_answers (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references audits(id) on delete cascade,
  question_id uuid not null references checklist_questions(id) on delete restrict,
  answer text not null check (answer in ('C', 'NC', 'X')),
  score_value numeric(5, 2),
  risk_level_snapshot text not null check (
    risk_level_snapshot in ('low', 'moderate', 'medium', 'high', 'critical')
  ),
  notes text,
  answered_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (audit_id, question_id)
);

create table if not exists stored_files (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units(id) on delete set null,
  uploaded_by_user_id uuid references app_users(id) on delete set null,
  file_type text not null check (
    file_type in ('audit_photo', 'action_plan_photo', 'certificate', 'report_pdf', 'other')
  ),
  storage_provider text not null default 'external',
  storage_bucket text,
  storage_key text,
  file_url text,
  original_filename text,
  mime_type text,
  file_size_bytes bigint,
  checksum text,
  created_at timestamptz not null default now()
);

create table if not exists file_links (
  id uuid primary key default gen_random_uuid(),
  file_id uuid not null references stored_files(id) on delete cascade,
  entity_type text not null check (
    entity_type in ('audit', 'audit_answer', 'action_plan', 'action_plan_feedback', 'certificate', 'report')
  ),
  entity_id uuid not null,
  caption text,
  created_at timestamptz not null default now()
);

create table if not exists action_plans (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  area_id uuid not null references audit_areas(id) on delete restrict,
  origin_audit_id uuid references audits(id) on delete set null,
  origin_answer_id uuid references audit_answers(id) on delete set null,
  question_id uuid references checklist_questions(id) on delete set null,
  generated_cycle_id uuid references audit_cycles(id) on delete set null,
  evaluation_cycle_id uuid references audit_cycles(id) on delete set null,
  created_by_user_id uuid references app_users(id) on delete set null,
  assigned_to_user_id uuid references app_users(id) on delete set null,
  title text not null,
  problem_description text,
  corrective_action text not null,
  due_at timestamptz,
  status text not null default 'generated' check (
    status in ('generated', 'sent_to_responsible', 'in_progress', 'submitted', 'approved', 'rejected', 'overdue', 'cancelled')
  ),
  impact_status text not null default 'not_evaluated' check (
    impact_status in ('not_evaluated', 'effective', 'partially_effective', 'not_effective')
  ),
  impact_score_delta numeric(5, 2),
  approved_by_user_id uuid references app_users(id) on delete set null,
  approved_at timestamptz,
  rejected_by_user_id uuid references app_users(id) on delete set null,
  rejected_at timestamptz,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists action_plan_tokens (
  id uuid primary key default gen_random_uuid(),
  action_plan_id uuid not null references action_plans(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  last_used_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists action_plan_feedback (
  id uuid primary key default gen_random_uuid(),
  action_plan_id uuid not null references action_plans(id) on delete cascade,
  submitted_by_user_id uuid references app_users(id) on delete set null,
  evidence_file_id uuid references stored_files(id) on delete set null,
  observation text,
  status text not null default 'submitted' check (status in ('submitted', 'approved', 'rejected')),
  reviewed_by_user_id uuid references app_users(id) on delete set null,
  reviewed_at timestamptz,
  review_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  area_id uuid references audit_areas(id) on delete set null,
  audit_id uuid references audits(id) on delete set null,
  cycle_id uuid references audit_cycles(id) on delete set null,
  generated_by_user_id uuid references app_users(id) on delete set null,
  pdf_file_id uuid references stored_files(id) on delete set null,
  report_type text not null check (report_type in ('monthly', 'comparison', 'general')),
  title text not null,
  period_label text not null,
  status text not null default 'generated' check (status in ('generated', 'sent', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists report_recipients (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references reports(id) on delete cascade,
  user_id uuid not null references app_users(id) on delete cascade,
  access_role text not null default 'viewer' check (access_role in ('viewer', 'responsible', 'auditor', 'quality')),
  viewed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (report_id, user_id)
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  area_id uuid references audit_areas(id) on delete set null,
  file_id uuid references stored_files(id) on delete set null,
  name text not null,
  document_type text not null,
  issued_at date,
  expires_at date,
  status text not null default 'valid' check (status in ('valid', 'expiring', 'expired', 'waived')),
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units(id) on delete set null,
  recipient_user_id uuid not null references app_users(id) on delete cascade,
  title text not null,
  body text,
  notification_type text not null,
  entity_type text,
  entity_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists sync_queue (
  id uuid primary key default gen_random_uuid(),
  device_id uuid references mobile_devices(id) on delete set null,
  user_id uuid references app_users(id) on delete set null,
  client_operation_id text not null,
  entity_type text not null,
  entity_id uuid,
  operation text not null check (operation in ('create', 'update', 'delete', 'upload')),
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending', 'synced', 'error', 'ignored')),
  error_message text,
  created_at timestamptz not null default now(),
  synced_at timestamptz,
  unique (client_operation_id)
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units(id) on delete set null,
  actor_user_id uuid references app_users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_areas_unit_idx on audit_areas (unit_id, active, display_order);
create index if not exists checklist_blocks_checklist_idx on checklist_blocks (checklist_id, display_order);
create index if not exists checklist_questions_block_idx on checklist_questions (block_id, question_number);
create index if not exists audit_cycles_unit_month_idx on audit_cycles (unit_id, month_start);
create index if not exists audits_area_cycle_idx on audits (area_id, cycle_id, status);
create index if not exists audit_answers_audit_idx on audit_answers (audit_id);
create index if not exists audit_answers_question_idx on audit_answers (question_id, answer);
create index if not exists action_plans_area_status_idx on action_plans (area_id, status, due_at);
create index if not exists action_plans_assigned_status_idx on action_plans (assigned_to_user_id, status, due_at);
create index if not exists action_plan_feedback_plan_idx on action_plan_feedback (action_plan_id, created_at desc);
create index if not exists stored_files_type_idx on stored_files (file_type, created_at desc);
create index if not exists file_links_entity_idx on file_links (entity_type, entity_id);
create index if not exists reports_area_cycle_idx on reports (area_id, cycle_id, report_type);
create index if not exists notifications_recipient_idx on notifications (recipient_user_id, read_at, created_at desc);
create index if not exists sync_queue_status_idx on sync_queue (status, created_at);
create index if not exists activity_logs_entity_idx on activity_logs (entity_type, entity_id, created_at desc);

insert into organizations (id, name)
values ('00000000-0000-0000-0000-000000000001', 'IDVIDA')
on conflict (id) do nothing;

insert into units (id, organization_id, name, code)
values (
  '00000000-0000-0000-0000-000000000101',
  '00000000-0000-0000-0000-000000000001',
  'Hospital Einstein Morumbi',
  'einstein-morumbi'
)
on conflict (id) do nothing;
