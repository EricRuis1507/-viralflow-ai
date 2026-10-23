-- Table: profiles
-- User profiles and account settings
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  plan 'free' | 'pro' | 'enterprise' default 'free',
  credits integer default 10,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Table: campaigns
-- Saved viral flows
create table campaigns (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  idea text not null,
  angle jsonb not null,
  hooks jsonb not null,
  selected_hook_id text,
  script jsonb,
  storyboard jsonb,
  repurposed jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Table: hook_templates
-- The "Hook Lab" library
create table hook_templates (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  framework text not null,
  template_text text not null,
  category text,
  success_rate float,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS Policies
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

alter table campaigns enable row level security;
create policy "Users can view own campaigns." on campaigns for select using ( auth.uid() = user_id );
create policy "Users can create own campaigns." on campaigns for insert with check ( auth.uid() = user_id );
create policy "Users can update own campaigns." on campaigns for update using ( auth.uid() = user_id );

alter table hook_templates enable row level security;
create policy "Templates are viewable by everyone." on hook_templates for select using ( true );
