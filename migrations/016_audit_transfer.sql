alter table audits add column if not exists active_device_id uuid references mobile_devices(id) on delete set null;
update audits set active_device_id = device_id where active_device_id is null and device_id is not null;

alter table audit_answers add column if not exists answered_by_user_id uuid references app_users(id) on delete set null;
update audit_answers aa
set answered_by_user_id = a.auditor_user_id
from audits a
where a.id = aa.audit_id and aa.answered_by_user_id is null;

create table if not exists audit_transfer_answer_locks (
  audit_id uuid not null references audits(id) on delete cascade,
  question_id uuid not null references checklist_questions(id) on delete restrict,
  locked_at timestamptz not null default now(),
  primary key (audit_id, question_id)
);

create table if not exists audit_transfer_revoked_devices (
  audit_id uuid not null references audits(id) on delete cascade,
  device_id uuid not null references mobile_devices(id) on delete cascade,
  revoked_at timestamptz not null default now(),
  primary key (audit_id, device_id)
);
