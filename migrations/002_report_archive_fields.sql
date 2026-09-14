alter table reports
  add column if not exists file_url text,
  add column if not exists file_name text,
  add column if not exists download_name text,
  add column if not exists available_from date,
  add column if not exists source_audit_id uuid references audits(id) on delete set null;

do $$
begin
  alter table reports drop constraint if exists reports_report_type_check;
  alter table reports add constraint reports_report_type_check check (
    report_type in ('monthly', 'comparison', 'quarterly', 'semiannual', 'annual', 'general')
  );
end $$;

create unique index if not exists reports_area_cycle_type_unique_idx
  on reports (area_id, cycle_id, report_type)
  where area_id is not null and cycle_id is not null;

create index if not exists reports_status_available_idx
  on reports (status, available_from, created_at desc);
