create table if not exists report_editable_content (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  report_type text not null check (report_type in ('monthly', 'comparison', 'organization-monthly')),
  scope_key text not null,
  period_key text not null,
  content jsonb not null default '{}'::jsonb,
  updated_by_user_id uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (unit_id, report_type, scope_key, period_key)
);

create index if not exists report_editable_content_unit_idx
  on report_editable_content (unit_id, report_type, scope_key, period_key);
