create table organization (
  id serial primary key,
  updated_at timestamp default now(),
  name text unique not null,
  logo text,
  address jsonb,
  owner uuid not null,
  bank_information jsonb,
  tax_id text,

  constraint name_length check (char_length(name) >= 3),
  constraint fk_owner foreign key (owner) references public.user(id)
);

create table organization_user (
  user_id uuid,
  organization_id serial,

  primary key (user_id, organization_id),
  constraint fk_user foreign key (user_id) references public.user(id) on delete cascade,
  constraint fk_organization foreign key (organization_id) references organization(id) on delete cascade
);