alter table reports
  add column if not exists scope_type text not null default 'area',
  add column if not exists scope_key text,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

update reports r
set scope_key = a.slug
from audit_areas a
where r.area_id = a.id and r.scope_key is null;

alter table reports drop constraint if exists reports_scope_type_check;
alter table reports add constraint reports_scope_type_check
  check (scope_type in ('area', 'organization_area'));

create unique index if not exists reports_organization_cycle_type_unique_idx
  on reports (scope_type, scope_key, cycle_id, report_type)
  where scope_type = 'organization_area' and scope_key is not null and cycle_id is not null;

create index if not exists reports_scope_lookup_idx
  on reports (unit_id, scope_type, scope_key, cycle_id, created_at desc);
