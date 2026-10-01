alter table app_users
  add column if not exists password_reset_pending boolean not null default false;
