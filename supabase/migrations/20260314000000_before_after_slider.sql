alter table public.profiles
  add column if not exists show_before_after boolean default false,
  add column if not exists before_after jsonb;
