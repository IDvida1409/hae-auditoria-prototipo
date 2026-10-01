alter table action_plan_documents
  add column if not exists pdf_file_id uuid references stored_files(id) on delete set null,
  add column if not exists pdf_file_url text,
  add column if not exists pdf_file_name text,
  add column if not exists pdf_generated_at timestamptz,
  add column if not exists pdf_generation_error text;

create index if not exists action_plan_documents_pdf_file_idx
  on action_plan_documents (pdf_file_id)
  where pdf_file_id is not null;

create unique index if not exists report_generation_jobs_action_plan_document_active_idx
  on report_generation_jobs ((payload->>'actionPlanDocumentId'))
  where report_type='action_plan' and status in ('queued','processing');
