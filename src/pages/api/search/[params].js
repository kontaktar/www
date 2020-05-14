const database = require("../../../utils/database").instance;

export default async ({ query: { params } }, response) => {
  try {
    const words = params.split(" ");
    const wordsRegex = `(${words.join("|")})`;
    const wordsLike = `%${words.join("% <-> %")}%`;
    console.log("params", params);
    const post = await database.many(
      `
        SELECT
          e.id as experience_id
        FROM experiences e
        LEFT JOIN users u ON e.user_id = u.id
        WHERE LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description) ~ '${wordsRegex}'
        GROUP BY e.id, u.user_name, u.first_name, u.last_name, e.title, e.description
        ORDER BY (LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description) <-> '${wordsLike}') ASC;
      `
    );
    response.status(200).json(post);
  } catch (error) {
    console.error(error);
    response.status(500).end();
  }
};
