
create type public.app_role as enum ('admin','user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can view their own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.assign_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'user');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_assign_role
after insert on auth.users
for each row execute function public.assign_first_admin();

create table public.resume_entries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('work','education','skill')),
  sort_order integer not null default 0,
  title text not null default '',
  subtitle text not null default '',
  location text not null default '',
  period text not null default '',
  detail text not null default '',
  items text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.resume_entries to anon;
grant select, insert, update, delete on public.resume_entries to authenticated;
grant all on public.resume_entries to service_role;
alter table public.resume_entries enable row level security;
create policy "Resume entries are publicly viewable" on public.resume_entries for select to anon, authenticated using (true);
create policy "Admins can insert resume entries" on public.resume_entries for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "Admins can update resume entries" on public.resume_entries for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins can delete resume entries" on public.resume_entries for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger update_resume_entries_updated_at before update on public.resume_entries
for each row execute function public.update_updated_at_column();

insert into public.resume_entries (kind, sort_order, title, subtitle, location, period, items) values
('work',1,'Senior Frontend Engineer','Orbit Labs','Remote','2024 — Present', array['Lead frontend on a realtime analytics product used by 200+ product teams.','Rebuilt the charting pipeline, cutting dashboard load times by 60%.','Own the design system and motion guidelines across three apps.']),
('work',2,'Frontend Engineer','Nimbus Studio','Kathmandu, Nepal','2022 — 2024', array['Shipped headless commerce storefronts with sub-second navigation.','Built an internal animation toolkit on GSAP adopted across client work.','Mentored two junior engineers into full-time roles.']),
('work',3,'UI Developer','Freelance','Kathmandu, Nepal','2020 — 2022', array['Delivered marketing sites and product interfaces for early-stage startups.','Focused on performance budgets, accessibility, and motion craft.']);

insert into public.resume_entries (kind, sort_order, title, subtitle, period, detail) values
('education',1,'BSc. Computer Science','Tribhuvan University','2016 — 2020','Focused on human-computer interaction, graphics, and web technologies.'),
('education',2,'Interaction Design Specialization','UC San Diego (Coursera)','2021','Design principles, prototyping, and evaluation of interactive systems.');

insert into public.resume_entries (kind, sort_order, title, items) values
('skill',1,'Frontend', array['React','TypeScript','Tailwind CSS','GSAP']),
('skill',2,'Backend', array['Node.js','Server Functions','PostgreSQL','REST']),
('skill',3,'Craft', array['Design systems','Motion','Accessibility','Performance']);
