create table if not exists report_artifacts (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references reports(id) on delete cascade,
  file_id uuid not null references stored_files(id),
  job_id uuid not null unique references report_generation_jobs(id),
  created_at timestamptz not null default now()
);
create index if not exists report_artifacts_report_idx
  on report_artifacts (report_id,created_at desc);
