CREATE TABLE users(
	id serial PRIMARY KEY,
	user_name VARCHAR (30) UNIQUE NOT NULL,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
	email VARCHAR (355) UNIQUE NOT NULL,
	website VARCHAR (355),
	phone_number VARCHAR (10),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	last_login TIMESTAMPTZ,
  ssn VARCHAR (10) UNIQUE NOT NULL
);