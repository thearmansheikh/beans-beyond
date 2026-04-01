-- ══════════════════════════════════════════════════════════════════
-- Beans & Beyond — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ══════════════════════════════════════════════════════════════════

-- ── Orders ────────────────────────────────────────────────────────
create table if not exists orders (
  id             uuid default gen_random_uuid() primary key,
  created_at     timestamptz default now(),
  order_type     text not null check (order_type in ('dine-in', 'takeaway', 'delivery')),
  status         text not null default 'pending'
                   check (status in ('pending','confirmed','preparing','ready','delivered','cancelled')),
  customer_name  text not null,
  customer_email text,
  customer_phone text,
  delivery_address text,
  table_number   text,
  subtotal       numeric(10,2) not null,
  delivery_fee   numeric(10,2) default 0,
  service_charge numeric(10,2) default 0,
  total          numeric(10,2) not null,
  notes          text,
  promo_code     text,
  discount       numeric(10,2) default 0
);

-- ── Order Items ───────────────────────────────────────────────────
create table if not exists order_items (
  id             uuid default gen_random_uuid() primary key,
  order_id       uuid references orders(id) on delete cascade,
  menu_item_id   text not null,
  name           text not null,
  price          numeric(10,2) not null,
  quantity       integer not null,
  customizations jsonb default '{}',
  subtotal       numeric(10,2) not null
);

-- ── Bookings ──────────────────────────────────────────────────────
create table if not exists bookings (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  phone       text not null,
  date        date not null,
  time        text not null,
  party_size  integer not null,
  notes       text,
  status      text not null default 'pending'
                check (status in ('pending','confirmed','cancelled'))
);

-- ── Newsletter Subscribers ────────────────────────────────────────
create table if not exists newsletter_subscribers (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamptz default now(),
  email       text not null unique,
  subscribed  boolean default true
);

-- ── Contact Messages ──────────────────────────────────────────────
create table if not exists contact_messages (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  read        boolean default false
);

-- ── Catering Enquiries ────────────────────────────────────────────
create table if not exists catering_enquiries (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  phone       text not null,
  company     text,
  event_type  text,
  event_date  date,
  guest_count integer,
  budget      text,
  message     text,
  status      text default 'new'
);

-- ── Menu Items (admin-managed; public can read available items) ───
create table if not exists menu_items (
  id            uuid default gen_random_uuid() primary key,
  created_at    timestamptz default now(),
  name          text not null,
  category      text not null,
  description   text,
  price         numeric(10,2) not null,
  image_url     text,
  available     boolean not null default true,
  popular       boolean default false,
  chefs_pick    boolean default false,
  vegetarian    boolean default false,
  vegan         boolean default false,
  gluten_free   boolean default false,
  allergens     text[] default '{}',
  display_order integer default 0
);

-- ══════════════════════════════════════════════════════════════════
-- Row Level Security (RLS) — allow public inserts, restrict reads
-- ══════════════════════════════════════════════════════════════════

alter table menu_items             enable row level security;
alter table orders                 enable row level security;
alter table order_items            enable row level security;
alter table bookings               enable row level security;
alter table newsletter_subscribers enable row level security;
alter table contact_messages       enable row level security;
alter table catering_enquiries     enable row level security;

-- Anyone can read available menu items (public menu page)
create policy "public read menu_items"     on menu_items             for select using (available = true);

-- Anyone can INSERT (customers placing orders, bookings, signups)
create policy "public insert orders"       on orders                 for insert with check (true);
create policy "public insert order_items"  on order_items            for insert with check (true);
create policy "public insert bookings"     on bookings               for insert with check (true);
create policy "public insert newsletter"   on newsletter_subscribers for insert with check (true);
create policy "public insert contact"      on contact_messages       for insert with check (true);
create policy "public insert catering"     on catering_enquiries     for insert with check (true);

-- Only authenticated users (admin) can SELECT/UPDATE/DELETE
create policy "admin select orders"        on orders                 for select using (auth.role() = 'authenticated');
create policy "admin select order_items"   on order_items            for select using (auth.role() = 'authenticated');
create policy "admin select bookings"      on bookings               for select using (auth.role() = 'authenticated');
create policy "admin select newsletter"    on newsletter_subscribers for select using (auth.role() = 'authenticated');
create policy "admin select contact"       on contact_messages       for select using (auth.role() = 'authenticated');
create policy "admin select catering"      on catering_enquiries     for select using (auth.role() = 'authenticated');
create policy "admin select menu_items"    on menu_items             for select using (auth.role() = 'authenticated');
create policy "admin insert menu_items"    on menu_items             for insert with check (auth.role() = 'authenticated');
create policy "admin update menu_items"    on menu_items             for update using (auth.role() = 'authenticated');
create policy "admin delete menu_items"    on menu_items             for delete using (auth.role() = 'authenticated');
create policy "admin update orders"        on orders                 for update using (auth.role() = 'authenticated');
create policy "admin update bookings"      on bookings               for update using (auth.role() = 'authenticated');
create policy "admin update contact"       on contact_messages       for update using (auth.role() = 'authenticated');
create policy "admin update catering"      on catering_enquiries     for update using (auth.role() = 'authenticated');
