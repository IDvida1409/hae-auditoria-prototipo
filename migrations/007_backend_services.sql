create unique index if not exists audit_workflow_settings_unit_default_idx
  on audit_workflow_settings (unit_id) where area_id is null;

alter table notifications add column if not exists event_key text;
create unique index if not exists notifications_recipient_event_idx
  on notifications (recipient_user_id,event_key) where event_key is not null;

alter table report_generation_jobs
  add column if not exists attempts integer not null default 0,
  add column if not exists claim_token uuid,
  add column if not exists lease_expires_at timestamptz;

alter table reports drop constraint if exists reports_report_type_check;
alter table reports add constraint reports_report_type_check check
  (report_type in ('monthly','comparison','quarterly','semiannual','annual','general','action_plan'));

create index if not exists report_jobs_claim_idx on report_generation_jobs
  (status,lease_expires_at,created_at);
