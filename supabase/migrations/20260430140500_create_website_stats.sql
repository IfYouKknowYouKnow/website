create table if not exists public.website_stats (
  id text primary key,
  curated_places_count integer not null default 0 check (curated_places_count >= 0),
  user_count integer not null default 0 check (user_count >= 0),
  city_count integer not null default 0 check (city_count >= 0),
  updated_at timestamptz not null default now()
);

alter table public.website_stats enable row level security;

drop policy if exists website_stats_read on public.website_stats;
create policy website_stats_read
  on public.website_stats
  for select
  using (true);

grant select on public.website_stats to anon, authenticated;

create or replace function public.refresh_website_stats()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.website_stats (
    id,
    curated_places_count,
    user_count,
    city_count,
    updated_at
  )
  values (
    'landing',
    (select count(*)::integer from public.places),
    (select count(*)::integer from public.profiles),
    (select count(*)::integer from public.active_cities),
    now()
  )
  on conflict (id) do update
  set curated_places_count = excluded.curated_places_count,
      user_count = excluded.user_count,
      city_count = excluded.city_count,
      updated_at = excluded.updated_at;
end;
$$;

create or replace function public.refresh_website_stats_from_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.refresh_website_stats();
  return null;
end;
$$;

select public.refresh_website_stats();

drop trigger if exists refresh_website_stats_on_places on public.places;
create trigger refresh_website_stats_on_places
  after insert or update or delete or truncate
  on public.places
  for each statement
  execute function public.refresh_website_stats_from_trigger();

drop trigger if exists refresh_website_stats_on_profiles on public.profiles;
create trigger refresh_website_stats_on_profiles
  after insert or update or delete or truncate
  on public.profiles
  for each statement
  execute function public.refresh_website_stats_from_trigger();

drop trigger if exists refresh_website_stats_on_active_cities on public.active_cities;
create trigger refresh_website_stats_on_active_cities
  after insert or update or delete or truncate
  on public.active_cities
  for each statement
  execute function public.refresh_website_stats_from_trigger();

comment on table public.website_stats is
  'Public read model for website landing page statistics.';
