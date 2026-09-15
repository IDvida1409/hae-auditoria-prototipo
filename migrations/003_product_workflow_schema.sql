create table if not exists restaurants (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  name text not null,
  legal_name text,
  document_number text,
  contact_name text,
  contact_email text,
  contact_phone text,
  restaurant_type text not null default 'third_party' check (
    restaurant_type in ('internal', 'third_party')
  ),
  contract_status text not null default 'active' check (
    contract_status in ('active', 'inactive', 'suspended')
  ),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (unit_id, name)
);

alter table audit_areas
  add column if not exists restaurant_id uuid references restaurants(id) on delete set null,
  add column if not exists responsible_user_id uuid references app_users(id) on delete set null;

alter table app_users
  add column if not exists platform_scope text not null default 'unit',
  add column if not exists must_change_password boolean not null default false,
  add column if not exists invited_at timestamptz,
  add column if not exists deactivated_at timestamptz;

do $$
begin
  alter table app_users drop constraint if exists app_users_platform_scope_check;
  alter table app_users add constraint app_users_platform_scope_check check (
    platform_scope in (
      'all_units',
      'unit',
      'assigned_areas',
      'assigned_restaurants',
      'read_only_assigned_areas'
    )
  );

  alter table app_users drop constraint if exists app_users_role_check;
  alter table app_users add constraint app_users_role_check check (
    role in (
      'admin',
      'quality',
      'auditor',
      'area_responsible',
      'restaurant_responsible',
      'viewer'
    )
  );
end $$;

create table if not exists user_area_permissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  unit_id uuid not null references units(id) on delete cascade,
  area_id uuid references audit_areas(id) on delete cascade,
  restaurant_id uuid references restaurants(id) on delete cascade,
  can_view_area_dashboard boolean not null default true,
  can_view_area_scores boolean not null default true,
  can_view_reports boolean not null default true,
  can_submit_action_plan_feedback boolean not null default true,
  can_view_feedback_history boolean not null default true,
  can_view_notifications boolean not null default true,
  can_justify_delay boolean not null default true,
  can_download_reports boolean not null default false,
  can_manage_certificates boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, area_id),
  unique (user_id, restaurant_id)
);

create table if not exists audit_workflow_settings (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  area_id uuid references audit_areas(id) on delete cascade,
  configured_by_user_id uuid references app_users(id) on delete set null,
  audit_start_day integer check (audit_start_day between 1 and 31),
  audit_end_day integer check (audit_end_day between 1 and 31),
  auto_select_best_audit_dates boolean not null default false,
  action_plan_due_days integer not null default 30 check (action_plan_due_days > 0),
  action_plan_due_starts_on text not null default 'audit_finished' check (
    action_plan_due_starts_on in ('audit_finished', 'report_sent', 'responsible_acknowledged')
  ),
  allow_resubmission_after_rejection boolean not null default true,
  allow_resubmission_after_due_date boolean not null default false,
  max_resubmission_attempts integer check (max_resubmission_attempts is null or max_resubmission_attempts >= 0),
  reuse_same_action_plan_on_rejection boolean not null default true,
  require_acknowledgement_signature boolean not null default false,
  require_evidence_photo boolean not null default true,
  allow_delay_justification boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (unit_id, area_id)
);

alter table report_recipients
  add column if not exists delivery_status text not null default 'pending',
  add column if not exists delivered_at timestamptz,
  add column if not exists first_opened_at timestamptz,
  add column if not exists last_opened_at timestamptz,
  add column if not exists can_download_pdf boolean not null default true,
  add column if not exists notes text;

do $$
begin
  alter table report_recipients drop constraint if exists report_recipients_delivery_status_check;
  alter table report_recipients add constraint report_recipients_delivery_status_check check (
    delivery_status in ('pending', 'available_in_panel', 'viewed', 'downloaded', 'archived')
  );
end $$;

create table if not exists action_plan_documents (
  id uuid primary key default gen_random_uuid(),
  public_code text not null unique,
  unit_id uuid not null references units(id) on delete cascade,
  area_id uuid not null references audit_areas(id) on delete cascade,
  restaurant_id uuid references restaurants(id) on delete set null,
  origin_audit_id uuid references audits(id) on delete set null,
  origin_report_id uuid references reports(id) on delete set null,
  created_by_user_id uuid references app_users(id) on delete set null,
  reviewed_by_user_id uuid references app_users(id) on delete set null,
  assigned_to_user_id uuid references app_users(id) on delete set null,
  generation_mode text not null default 'automatic' check (
    generation_mode in ('automatic', 'automatic_reviewed', 'manual')
  ),
  delivery_format text not null default 'html_form' check (
    delivery_format in ('html_form', 'pdf_archive')
  ),
  layout_version text not null default 'approved-report-style-v1',
  title text not null,
  summary text,
  complementary_instructions text,
  locked_snapshot jsonb not null default '{}'::jsonb,
  editable_by_responsible boolean not null default false,
  due_at timestamptz,
  status text not null default 'draft' check (
    status in (
      'draft',
      'generated',
      'under_auditor_review',
      'reviewed',
      'ready_to_send',
      'available_to_responsible',
      'sent_to_responsible',
      'acknowledged',
      'in_progress',
      'submitted',
      'pending_review',
      'approved',
      'rejected',
      'reopened',
      'overdue',
      'archived',
      'cancelled'
    )
  ),
  generated_at timestamptz,
  reviewed_at timestamptz,
  sent_to_responsible_at timestamptz,
  acknowledged_at timestamptz,
  last_feedback_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table action_plans
  add column if not exists action_plan_document_id uuid references action_plan_documents(id) on delete set null,
  add column if not exists creation_source text not null default 'audit_nc',
  add column if not exists responsible_report_id uuid references reports(id) on delete set null,
  add column if not exists sent_to_responsible_at timestamptz,
  add column if not exists acknowledged_at timestamptz,
  add column if not exists submitted_at timestamptz,
  add column if not exists approved_at timestamptz,
  add column if not exists rejected_at timestamptz,
  add column if not exists reopened_at timestamptz,
  add column if not exists last_feedback_id uuid references action_plan_feedback(id) on delete set null,
  add column if not exists resubmission_attempt integer not null default 0,
  add column if not exists max_resubmission_attempts integer,
  add column if not exists next_month_report_id uuid references reports(id) on delete set null,
  add column if not exists impact_audit_id uuid references audits(id) on delete set null,
  add column if not exists automatic_correction_text text,
  add column if not exists auditor_complement_text text,
  add column if not exists auditor_reviewed_at timestamptz,
  add column if not exists resubmission_note text,
  add column if not exists delay_justification text,
  add column if not exists delay_justified_at timestamptz,
  add column if not exists locked_question_snapshot text,
  add column if not exists locked_risk_snapshot text,
  add column if not exists locked_audit_notes_snapshot text,
  add column if not exists locked_original_evidence_file_ids uuid[] not null default '{}'::uuid[];

do $$
begin
  alter table action_plans drop constraint if exists action_plans_creation_source_check;
  alter table action_plans add constraint action_plans_creation_source_check check (
    creation_source in ('audit_nc', 'manual', 'import')
  );

  alter table action_plans drop constraint if exists action_plans_status_check;
  alter table action_plans add constraint action_plans_status_check check (
    status in (
      'generated',
      'under_auditor_review',
      'ready_to_send',
      'available_to_responsible',
      'sent_to_responsible',
      'acknowledged',
      'in_progress',
      'submitted',
      'pending_review',
      'approved',
      'rejected',
      'reopened',
      'overdue',
      'cancelled'
    )
  );
end $$;

create table if not exists action_plan_acknowledgements (
  id uuid primary key default gen_random_uuid(),
  action_plan_document_id uuid references action_plan_documents(id) on delete cascade,
  action_plan_id uuid references action_plans(id) on delete cascade,
  responsible_user_id uuid not null references app_users(id) on delete cascade,
  acknowledgement_text text not null,
  signature_name text,
  signed_at timestamptz not null default now(),
  ip_address inet,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  check (
    action_plan_document_id is not null
    or action_plan_id is not null
  )
);

create table if not exists action_plan_document_items (
  id uuid primary key default gen_random_uuid(),
  action_plan_document_id uuid not null references action_plan_documents(id) on delete cascade,
  action_plan_id uuid references action_plans(id) on delete cascade,
  audit_answer_id uuid references audit_answers(id) on delete set null,
  item_order integer not null default 1,
  question_text text,
  risk_level text,
  nonconformity_description text,
  required_correction text not null,
  evidence_file_ids uuid[] not null default '{}'::uuid[],
  response_required boolean not null default true,
  response_photo_required boolean not null default true,
  locked boolean not null default true,
  auditor_notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (action_plan_document_id, item_order)
);

alter table action_plan_feedback
  add column if not exists submitted_from text not null default 'responsible_panel',
  add column if not exists response_file_id uuid references stored_files(id) on delete set null,
  add column if not exists response_file_ids uuid[] not null default '{}'::uuid[],
  add column if not exists correction_summary text,
  add column if not exists completion_status text not null default 'completed',
  add column if not exists delay_justification text,
  add column if not exists rejection_reason text,
  add column if not exists capture_method text not null default 'upload',
  add column if not exists client_device_type text,
  add column if not exists visible_to_responsible_at timestamptz;

do $$
begin
  alter table action_plan_feedback drop constraint if exists action_plan_feedback_submitted_from_check;
  alter table action_plan_feedback add constraint action_plan_feedback_submitted_from_check check (
    submitted_from in ('responsible_panel', 'external_link', 'auditor_panel', 'import')
  );

  alter table action_plan_feedback drop constraint if exists action_plan_feedback_status_check;
  alter table action_plan_feedback add constraint action_plan_feedback_status_check check (
    status in ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'reopened', 'cancelled')
  );

  alter table action_plan_feedback drop constraint if exists action_plan_feedback_completion_status_check;
  alter table action_plan_feedback add constraint action_plan_feedback_completion_status_check check (
    completion_status in ('completed', 'partially_completed', 'not_completed', 'delayed')
  );

  alter table action_plan_feedback drop constraint if exists action_plan_feedback_capture_method_check;
  alter table action_plan_feedback add constraint action_plan_feedback_capture_method_check check (
    capture_method in ('upload', 'camera', 'tablet_camera', 'mobile_camera')
  );
end $$;

alter table action_plan_tokens
  alter column action_plan_id drop not null,
  add column if not exists action_plan_document_id uuid references action_plan_documents(id) on delete cascade,
  add column if not exists public_code text,
  add column if not exists form_mode text not null default 'responsible_response',
  add column if not exists max_uses integer,
  add column if not exists used_count integer not null default 0;

do $$
begin
  alter table action_plan_tokens drop constraint if exists action_plan_tokens_form_mode_check;
  alter table action_plan_tokens add constraint action_plan_tokens_form_mode_check check (
    form_mode in ('responsible_response', 'resubmission', 'read_only')
  );

  alter table action_plan_tokens drop constraint if exists action_plan_tokens_target_check;
  alter table action_plan_tokens add constraint action_plan_tokens_target_check check (
    action_plan_id is not null
    or action_plan_document_id is not null
  );
end $$;

do $$
begin
  alter table file_links drop constraint if exists file_links_entity_type_check;
  alter table file_links add constraint file_links_entity_type_check check (
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
  );
end $$;

create table if not exists action_plan_review_events (
  id uuid primary key default gen_random_uuid(),
  action_plan_id uuid not null references action_plans(id) on delete cascade,
  feedback_id uuid references action_plan_feedback(id) on delete set null,
  reviewer_user_id uuid references app_users(id) on delete set null,
  decision text not null check (decision in ('approved', 'rejected')),
  justification text,
  allow_resubmission boolean not null default false,
  resubmission_due_at timestamptz,
  visible_to_responsible_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists action_plan_timeline_events (
  id uuid primary key default gen_random_uuid(),
  action_plan_id uuid not null references action_plans(id) on delete cascade,
  actor_user_id uuid references app_users(id) on delete set null,
  event_type text not null check (
    event_type in (
      'generated',
      'automatic_document_generated',
      'manual_document_created',
      'auditor_reviewed',
      'made_available',
      'document_sent',
      'acknowledged',
      'report_viewed',
      'feedback_submitted',
      'delay_justified',
      'approved',
      'rejected',
      'reopened',
      'resubmission_requested',
      'deadline_changed',
      'impact_evaluated',
      'cancelled'
    )
  ),
  title text not null,
  detail text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists action_plan_impact_evaluations (
  id uuid primary key default gen_random_uuid(),
  action_plan_id uuid not null references action_plans(id) on delete cascade,
  evaluation_cycle_id uuid not null references audit_cycles(id) on delete restrict,
  evaluation_audit_id uuid references audits(id) on delete set null,
  evaluated_by_user_id uuid references app_users(id) on delete set null,
  previous_score numeric(5, 2),
  evaluated_score numeric(5, 2),
  impact_status text not null check (
    impact_status in ('effective', 'partially_effective', 'not_effective', 'not_applicable')
  ),
  impact_note text,
  created_at timestamptz not null default now(),
  unique (action_plan_id, evaluation_cycle_id)
);

create table if not exists document_requirements (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  area_id uuid references audit_areas(id) on delete cascade,
  restaurant_id uuid references restaurants(id) on delete cascade,
  name text not null,
  document_type text not null,
  required boolean not null default true,
  alert_days_before_expiration integer not null default 30,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (unit_id, area_id, restaurant_id, document_type)
);

alter table certificates
  add column if not exists requirement_id uuid references document_requirements(id) on delete set null,
  add column if not exists uploaded_by_user_id uuid references app_users(id) on delete set null,
  add column if not exists reviewed_by_user_id uuid references app_users(id) on delete set null,
  add column if not exists reviewed_at timestamptz,
  add column if not exists review_note text;

create or replace view responsible_action_plan_inbox as
select
  ap.id as action_plan_id,
  ap.unit_id,
  ap.area_id,
  ap.assigned_to_user_id as responsible_user_id,
  aa.name as area_name,
  ap.title,
  ap.problem_description,
  ap.corrective_action,
  ap.automatic_correction_text,
  ap.auditor_complement_text,
  ap.due_at,
  ap.status,
  ap.creation_source,
  ap.resubmission_attempt,
  ap.max_resubmission_attempts,
  ap.action_plan_document_id,
  apd.generation_mode as document_generation_mode,
  apd.status as document_status,
  ap.acknowledged_at,
  ap.responsible_report_id,
  r.title as report_title,
  r.period_label as report_period_label,
  ap.sent_to_responsible_at,
  ap.submitted_at,
  ap.updated_at
from action_plans ap
join audit_areas aa on aa.id = ap.area_id
left join reports r on r.id = ap.responsible_report_id
left join action_plan_documents apd on apd.id = ap.action_plan_document_id
where ap.assigned_to_user_id is not null
  and ap.status in (
    'available_to_responsible',
    'sent_to_responsible',
    'acknowledged',
    'in_progress',
    'submitted',
    'pending_review',
    'rejected',
    'reopened',
    'overdue'
  );

create or replace view monthly_action_plan_impact as
select
  apie.id,
  apie.action_plan_id,
  ap.unit_id,
  ap.area_id,
  aa.name as area_name,
  ap.generated_cycle_id,
  apie.evaluation_cycle_id,
  apie.evaluation_audit_id,
  apie.previous_score,
  apie.evaluated_score,
  apie.impact_status,
  apie.impact_note,
  apie.created_at
from action_plan_impact_evaluations apie
join action_plans ap on ap.id = apie.action_plan_id
join audit_areas aa on aa.id = ap.area_id;

create index if not exists restaurants_unit_active_idx
  on restaurants (unit_id, active, name);

create index if not exists audit_areas_restaurant_idx
  on audit_areas (restaurant_id)
  where restaurant_id is not null;

create index if not exists audit_areas_responsible_idx
  on audit_areas (responsible_user_id)
  where responsible_user_id is not null;

create index if not exists user_area_permissions_user_idx
  on user_area_permissions (user_id, active);

create index if not exists user_area_permissions_area_idx
  on user_area_permissions (area_id, active)
  where area_id is not null;

create index if not exists report_recipients_user_delivery_idx
  on report_recipients (user_id, delivery_status, created_at desc);

create index if not exists audit_workflow_settings_unit_idx
  on audit_workflow_settings (unit_id, active);

create index if not exists audit_workflow_settings_area_idx
  on audit_workflow_settings (area_id, active)
  where area_id is not null;

create index if not exists action_plan_documents_responsible_idx
  on action_plan_documents (assigned_to_user_id, status, due_at)
  where assigned_to_user_id is not null;

create index if not exists action_plan_documents_public_code_idx
  on action_plan_documents (public_code);

create index if not exists action_plan_documents_area_idx
  on action_plan_documents (unit_id, area_id, status, created_at desc);

create index if not exists action_plan_document_items_document_idx
  on action_plan_document_items (action_plan_document_id, item_order);

create index if not exists action_plan_document_items_answer_idx
  on action_plan_document_items (audit_answer_id)
  where audit_answer_id is not null;

create index if not exists action_plan_tokens_document_idx
  on action_plan_tokens (action_plan_document_id, expires_at)
  where action_plan_document_id is not null;

create index if not exists action_plan_acknowledgements_document_idx
  on action_plan_acknowledgements (action_plan_document_id, signed_at desc)
  where action_plan_document_id is not null;

create index if not exists action_plan_acknowledgements_plan_idx
  on action_plan_acknowledgements (action_plan_id, signed_at desc)
  where action_plan_id is not null;

create index if not exists action_plans_responsible_report_idx
  on action_plans (responsible_report_id)
  where responsible_report_id is not null;

create index if not exists action_plans_document_idx
  on action_plans (action_plan_document_id)
  where action_plan_document_id is not null;

create index if not exists action_plans_pending_review_idx
  on action_plans (unit_id, status, submitted_at desc)
  where status in ('submitted', 'pending_review');

create index if not exists action_plan_review_events_plan_idx
  on action_plan_review_events (action_plan_id, created_at desc);

create index if not exists action_plan_timeline_events_plan_idx
  on action_plan_timeline_events (action_plan_id, created_at desc);

create index if not exists action_plan_impact_evaluations_cycle_idx
  on action_plan_impact_evaluations (evaluation_cycle_id, impact_status);

create index if not exists document_requirements_area_idx
  on document_requirements (unit_id, area_id, active);

create index if not exists certificates_requirement_idx
  on certificates (requirement_id, status, expires_at)
  where requirement_id is not null;
