SELECT setval(pg_get_serial_sequence('experiences', 'id'), (SELECT MAX(id) FROM experiences)+1);
SELECT setval(pg_get_serial_sequence('addresses', 'id'), (SELECT MAX(id) FROM addresses)+1);
SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users)+1);