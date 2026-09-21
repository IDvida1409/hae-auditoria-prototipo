-- Clean start requested for the next field-test cycle.
-- Users, permissions, areas, checklists and questions are intentionally preserved.
alter table audits
  add column if not exists responsible_user_id uuid references app_users(id) on delete set null;

create table if not exists stored_file_contents (
  file_id uuid primary key references stored_files(id) on delete cascade,
  contents bytea not null,
  created_at timestamptz not null default now()
);

truncate table
  audit_cycles,
  stored_files,
  mobile_devices,
  notifications,
  sync_queue,
  activity_logs,
  certificates,
  report_generation_jobs
restart identity cascade;

delete from app_state;

-- The area owner is derived from the access rule so audits and action plans
-- always carry the same responsible person shown in the user administration.
update audit_areas a
set responsible_user_id = (
  select p.user_id
  from user_area_permissions p
  join app_users u on u.id=p.user_id
  where p.area_id=a.id
    and p.unit_id=a.unit_id
    and p.active=true
    and u.active=true
    and u.role='area_responsible'
  order by p.created_at, p.id
  limit 1
), updated_at = now();
