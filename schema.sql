create table pets (
    id serial primary key,
    name text,
    -- if you wanted to limit the number of charatcters, use varchar(num)
    species varchar(100),
    birthdate date,
    -- when you have the info in another table, ask yourself:
    -- do pets have one owner?
    -- do pets have many owners?
    -- if pets have one and only one owner, then you put the foreign key right here
    owner_id integer REFERENCES owners (id)

);


create table owners (
    id serial primary key,
    name text,
    phone_number varchar(20)
);