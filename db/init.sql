-- Create a table for Public Users
create table user (
  id uuid references auth.users not null,
  updated_at timestamp,
  username text unique,
  is_super_admin boolean not null default false,
  name text,
  avatar_url text,
  organization serial,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3),
  -- may not work
  constraint fk_organization foreign key (organization) references public.organization(id)
);

alter table user
  enable row level security;

create policy "Users can insert their own profile." on user
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on user
  for update using (auth.uid() = id);

CREATE FUNCTION
  public.create_profile_for_new_user()
  RETURNS TRIGGER AS
  $$
  BEGIN
    INSERT INTO public.user (id)
    VALUES (NEW.id);
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;
  
CREATE TRIGGER
  create_profile_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.create_profile_for_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update an avatar." on storage.objects
  for update with check (bucket_id = 'avatars');