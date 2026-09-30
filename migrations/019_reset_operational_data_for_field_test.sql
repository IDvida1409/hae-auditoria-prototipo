-- Clean operational slate for the next full field test.
-- Users, access rules, areas, subareas, checklists and questions are preserved.

update units
set operational_reset_at=clock_timestamp(), updated_at=now();

truncate table
  audit_cycles,
  stored_files,
  notifications,
  sync_queue,
  activity_logs,
  report_generation_jobs
restart identity cascade;

delete from app_state;
