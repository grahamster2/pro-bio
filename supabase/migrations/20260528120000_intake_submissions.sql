-- Intake submissions for the Rovult client intake form.
-- Public form (no auth): anon role may INSERT; reads are service-role only.

create table if not exists public.intake_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  full_name     text,
  business_name text,
  email         text,
  phone         text,
  data          jsonb not null,
  file_urls     text[] not null default '{}',
  status        text not null default 'new'
);

alter table public.intake_submissions enable row level security;

-- Allow the public form to submit using the anon key (fallback path).
-- No SELECT policy: submissions are private. The service role bypasses RLS.
drop policy if exists "allow public insert" on public.intake_submissions;
create policy "allow public insert"
  on public.intake_submissions
  for insert
  to anon
  with check (true);

-- Public storage bucket for client file uploads done before submit.
insert into storage.buckets (id, name, public)
values ('intake-uploads', 'intake-uploads', true)
on conflict (id) do nothing;

-- Storage policies for the intake-uploads bucket.
drop policy if exists "intake uploads anon insert" on storage.objects;
create policy "intake uploads anon insert"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'intake-uploads');

drop policy if exists "intake uploads public select" on storage.objects;
create policy "intake uploads public select"
  on storage.objects
  for select
  to public
  using (bucket_id = 'intake-uploads');
