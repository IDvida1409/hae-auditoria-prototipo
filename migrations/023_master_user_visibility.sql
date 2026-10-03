-- Platform owner access is hidden from ordinary administrators and never receives operational notifications.
alter table app_users
  add column if not exists is_master boolean not null default false;

create index if not exists app_users_master_visibility_idx
  on app_users (unit_id, is_master, active, full_name);

update app_users
set is_master=true,
    role='admin',
    platform_scope='unit',
    updated_at=now()
where lower(username)=lower(coalesce(current_setting('app.primary_admin_username', true), 'david.souza'))
  and active=true;
