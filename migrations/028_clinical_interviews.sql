create table if not exists clinical_interviews (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references app_users(id),
  invite_token_hash char(64) not null unique,
  answers jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'submitted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz
);

create index if not exists clinical_interviews_owner_status_idx
  on clinical_interviews (owner_user_id, status, created_at desc);
