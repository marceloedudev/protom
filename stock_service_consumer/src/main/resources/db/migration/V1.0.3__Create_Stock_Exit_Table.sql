create table public.stock_exit (
    id serial not null,
    created_at timestamp,
    updated_at timestamp,
    uuid varchar(255) unique not null,
    primary key (id)
);
