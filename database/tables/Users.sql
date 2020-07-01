CREATE TABLE users(
	id serial PRIMARY KEY,
	user_name TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	website TEXT,
	phone_number TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	last_login TIMESTAMPTZ,
  ssn VARCHAR (10) UNIQUE NOT NULL
);