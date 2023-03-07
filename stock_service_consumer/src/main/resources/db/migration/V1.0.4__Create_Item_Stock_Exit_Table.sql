create table public.item_stock_exit (
    id serial not null,
    created_at timestamp,
    item_id integer,
    price numeric not null,
    quantity integer,
    stock_exit_id integer,
    updated_at timestamp,
    uuid varchar(255) unique not null,
    primary key (id),
    foreign key (stock_exit_id) references stock_exit
);
