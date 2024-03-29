-- DDL generated by Postico 1.5.14
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    postal_code text,
    street_name text,
    city text,
    country text
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX addresses_pkey ON addresses(id int4_ops);
