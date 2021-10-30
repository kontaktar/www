# This has to be run from superuser:
CREATE EXTENSION pg_trgm;

CREATE INDEX users_trgm_idx ON users USING GIN ((user_name || ' ' || first_name || ' ' || last_name) gin_trgm_ops);

CREATE INDEX experiences_trgm_idx ON experiences USING GIN ((title || ' ' || description) gin_trgm_ops);