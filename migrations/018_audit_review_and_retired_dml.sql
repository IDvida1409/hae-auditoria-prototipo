alter table sync_queue drop constraint if exists sync_queue_operation_check;
alter table sync_queue add constraint sync_queue_operation_check
  check (operation in ('create', 'update', 'delete', 'upload', 'upsert', 'review', 'finalize'));

update audit_areas
set active=false, updated_at=now()
where slug='dml-produto-quimico' and active=true;
