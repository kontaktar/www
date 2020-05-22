CREATE TABLE experiences(
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id), 
  title TEXT,
  description TEXT,
	years INTEGER,
	months INTEGER,
	published boolean DEFAULT false
);