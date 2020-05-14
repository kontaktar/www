-- Using this
explain analyze SELECT 	e.id, e.title, u.user_name
FROM experiences e
LEFT JOIN users u ON e.user_id = u.id
WHERE LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description) ~ '(han|vef)'
GROUP BY e.id, u.user_name, u.first_name, u.last_name, e.title, e.description
ORDER BY (LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description) <-> '%han% <-> %vef%') ASC;

-- Do tests with more data, the one above should be faster.
explain analyze SELECT 	e.id, e.title, u.user_name,
	similarity(LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description), '%han% <-> %vef%') as rank
FROM experiences e
LEFT JOIN users u ON e.user_id = u.id
WHERE LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description) ~ '(han|vef)'
GROUP BY e.id, u.user_name, u.first_name, u.last_name, e.title, e.description
ORDER BY rank DESC;



