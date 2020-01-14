create table owners (
    id serial primary key,
    name text,
    phone_number varchar(20),
    hash text
);

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

-- many-to-many references get a third linking table
-- this table does not need an ID
-- create table owners_pets (
--         owner_id INTEGER REFERENCES owners(id),
--         pet_id INTEGER REFERENCES pets(id)
-- );o