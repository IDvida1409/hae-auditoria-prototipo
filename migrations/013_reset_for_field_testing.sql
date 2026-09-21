-- One-time reset requested before the first field-test cycle.
-- Structural records (unit, areas, checklists, questions and workflow settings) are preserved.
truncate table
  audit_cycles,
  stored_files,
  mobile_devices,
  notifications,
  sync_queue,
  activity_logs,
  certificates,
  report_generation_jobs,
  user_sessions,
  password_reset_requests
restart identity cascade;

update audit_areas set responsible_user_id = null;
update audit_subareas set responsible_user_id = null;
update audit_workflow_settings set configured_by_user_id = null;

delete from app_users;
delete from app_state;
