create table if not exists tabs (
    id serial primary key,
    title varchar(50) not null,
    artist varchar(50) not null,
    username varchar(50) not null,
    is_private boolean default false,
    notes json,
    note_count integer not null,
    gtr_string_count integer not null,
    created_at timestamp not null default now()
);