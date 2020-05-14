CREATE TABLE addresses(
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id), 
  postal_code TEXT,
  street_name TEXT,
	city TEXT,
	country TEXT
);
