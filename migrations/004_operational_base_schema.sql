alter table checklists
  add column if not exists area_id uuid references audit_areas(id) on delete set null,
  add column if not exists source_key text,
  add column if not exists imported_at timestamptz;

create unique index if not exists checklists_area_version_unique_idx
  on checklists (unit_id, area_id, name, version_label)
  where area_id is not null;

create unique index if not exists checklist_blocks_checklist_order_unique_idx
  on checklist_blocks (checklist_id, display_order);

create table if not exists audit_subareas (
  id uuid primary key default gen_random_uuid(),
  area_id uuid not null references audit_areas(id) on delete cascade,
  responsible_user_id uuid references app_users(id) on delete set null,
  name text not null,
  slug text not null,
  description text,
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (area_id, slug)
);

create table if not exists subarea_members (
  id uuid primary key default gen_random_uuid(),
  subarea_id uuid not null references audit_subareas(id) on delete cascade,
  user_id uuid not null references app_users(id) on delete cascade,
  responsibility text not null default 'responsible',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (subarea_id, user_id, responsibility)
);

alter table audits
  add column if not exists subarea_id uuid references audit_subareas(id) on delete set null;

alter table action_plans
  add column if not exists subarea_id uuid references audit_subareas(id) on delete set null;

alter table action_plan_documents
  add column if not exists subarea_id uuid references audit_subareas(id) on delete set null;

alter table user_area_permissions
  add column if not exists subarea_id uuid references audit_subareas(id) on delete cascade,
  add column if not exists can_view_subarea_dashboard boolean not null default true;

create unique index if not exists user_area_permissions_user_subarea_unique_idx
  on user_area_permissions (user_id, subarea_id)
  where subarea_id is not null;

create unique index if not exists audit_workflow_settings_unit_default_unique_idx
  on audit_workflow_settings (unit_id)
  where area_id is null;

create index if not exists audit_subareas_area_active_idx
  on audit_subareas (area_id, active, display_order);

create index if not exists audits_subarea_cycle_idx
  on audits (subarea_id, cycle_id, status)
  where subarea_id is not null;

create index if not exists action_plans_subarea_status_idx
  on action_plans (subarea_id, status, due_at)
  where subarea_id is not null;

insert into audit_areas (id, unit_id, name, slug, area_type, display_order)
values
  ('00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000000101', 'Cozinha Catering', 'cozinha-catering', 'hospital_area', 10),
  ('00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000000101', 'Room Service', 'room-service', 'hospital_area', 20),
  ('00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000000101', 'Cozinha Fria SARP', 'cozinha-fria-sarp', 'hospital_area', 30),
  ('00000000-0000-0000-0000-000000001004', '00000000-0000-0000-0000-000000000101', 'Cozinha SARP', 'cozinha-sarp', 'hospital_area', 40),
  ('00000000-0000-0000-0000-000000001005', '00000000-0000-0000-0000-000000000101', 'Cozinha Pedido Especial', 'cozinha-pedido-especial', 'hospital_area', 50),
  ('00000000-0000-0000-0000-000000001006', '00000000-0000-0000-0000-000000000101', 'Saladas', 'saladas', 'hospital_area', 60),
  ('00000000-0000-0000-0000-000000001007', '00000000-0000-0000-0000-000000000101', 'Distribuição', 'distribuicao', 'hospital_area', 70),
  ('00000000-0000-0000-0000-000000001008', '00000000-0000-0000-0000-000000000101', 'Higienização de Cubas', 'higienizacao-cubas', 'hospital_area', 80),
  ('00000000-0000-0000-0000-000000001009', '00000000-0000-0000-0000-000000000101', 'Higienização de Louça', 'higienizacao-louca', 'hospital_area', 90),
  ('00000000-0000-0000-0000-000000001010', '00000000-0000-0000-0000-000000000101', 'DML - Produto Químico', 'dml-produto-quimico', 'hospital_area', 100),
  ('00000000-0000-0000-0000-000000001011', '00000000-0000-0000-0000-000000000101', 'Área de Resíduos', 'area-residuos', 'hospital_area', 110),
  ('00000000-0000-0000-0000-000000001012', '00000000-0000-0000-0000-000000000101', 'Documentação', 'documentacao', 'hospital_area', 120)
on conflict (unit_id, slug) do update set
  name = excluded.name,
  area_type = excluded.area_type,
  display_order = excluded.display_order,
  active = true,
  updated_at = now();

insert into audit_workflow_settings (
  unit_id,
  audit_start_day,
  audit_end_day,
  action_plan_due_days,
  action_plan_due_starts_on,
  allow_resubmission_after_rejection,
  allow_resubmission_after_due_date,
  max_resubmission_attempts,
  reuse_same_action_plan_on_rejection,
  require_acknowledgement_signature,
  require_evidence_photo,
  allow_delay_justification
)
values (
  '00000000-0000-0000-0000-000000000101',
  15,
  18,
  30,
  'report_sent',
  true,
  false,
  1,
  true,
  false,
  true,
  true
)
on conflict (unit_id) where area_id is null do update set
  audit_start_day = excluded.audit_start_day,
  audit_end_day = excluded.audit_end_day,
  action_plan_due_days = excluded.action_plan_due_days,
  action_plan_due_starts_on = excluded.action_plan_due_starts_on,
  allow_resubmission_after_rejection = excluded.allow_resubmission_after_rejection,
  allow_resubmission_after_due_date = excluded.allow_resubmission_after_due_date,
  max_resubmission_attempts = excluded.max_resubmission_attempts,
  reuse_same_action_plan_on_rejection = excluded.reuse_same_action_plan_on_rejection,
  require_acknowledgement_signature = excluded.require_acknowledgement_signature,
  require_evidence_photo = excluded.require_evidence_photo,
  allow_delay_justification = excluded.allow_delay_justification,
  updated_at = now();
