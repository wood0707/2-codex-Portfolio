alter table public.inquiries add column if not exists status text not null default 'new';
alter table public.inquiries add column if not exists admin_reply text not null default '';
alter table public.inquiries add column if not exists answered_at timestamptz;

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);
