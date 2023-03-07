create table public.stock_entry (
    id serial not null,
    created_at timestamp,
    updated_at timestamp,
    uuid varchar(255) unique not null,
    primary key (id)
);
