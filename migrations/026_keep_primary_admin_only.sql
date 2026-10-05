do $$
declare
  keeper_id uuid;
  keeper_unit_id uuid;
begin
  select id, unit_id
    into keeper_id, keeper_unit_id
  from app_users
  where lower(username) = lower(coalesce(current_setting('app.primary_admin_username', true), 'david.souza'))
    and lower(full_name) = 'david souza'
    and is_master = true
  order by created_at
  limit 1;

  if keeper_id is null then
    raise exception 'Usuario master David Souza nao encontrado; limpeza de usuarios cancelada.';
  end if;

  delete from app_users
  where unit_id = keeper_unit_id
    and id <> keeper_id;
end $$;
