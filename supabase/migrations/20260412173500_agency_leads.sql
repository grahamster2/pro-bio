create table public.agency_leads (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  project_details text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS but allow inserts
alter table public.agency_leads enable row level security;
create policy "Allow insert access" on public.agency_leads for insert with check (true);
