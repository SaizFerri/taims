create table client (
  id serial primary key,
  name text not null,
  address jsonb
  organization serial not null,

  constraint fk_organization foreign key(organization) references public.organization(id) on delete cascade,
);

create table project (
  id serial primary key,
  updated_at timestamp not null default now(),
  name text not null,
  organization serial not null,
  client serial not null,
  rate numeric(6,2),
  currency varchar(3),
  color varchar(7),
  estimated_hours numeric(15,1),

  constraint fk_organization foreign key(organization) references public.organization(id) on delete cascade,
  constraint fk_client foreign key(client) references public.client(id) on delete cascade
);

create table entry (
  id serial primary key,
  user uuid not null,
  description text,
  duration text,
  start_at timestamp not null default now(),
  end_at timestamp,
  project serial,
  billable boolean not null default true,

  constraint fk_user foreign key(user) references public.user(id) on delete cascade,
  constraint fk_project foreign key(project) references public.project(id),
);