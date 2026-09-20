create table if not exists password_reset_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  requested_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by_user_id uuid references app_users(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','resolved','cancelled'))
);

create unique index if not exists password_reset_requests_pending_user_idx
  on password_reset_requests (user_id) where status = 'pending';

create index if not exists password_reset_requests_status_idx
  on password_reset_requests (status, requested_at desc);

alter table app_users add column if not exists access_code_issued_at timestamptz;
