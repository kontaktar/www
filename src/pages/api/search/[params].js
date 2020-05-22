const database = require("../../../utils/database").instance;

export default async ({ query: { params } }, response) => {
  try {
    const words = params.split(" ");
    const wordsRegex = `(${words.join("|")})`;
    const wordsLike = `%${words.join("% <-> %")}%`;

    const post = await database.any(
      `
        SELECT
          e.id as experience_id, u.id as user_id, u.user_name, u.first_name, u.last_name, e.title, e.description, e.years, e.months
        FROM experiences e
        LEFT JOIN users u ON e.user_id = u.id
        WHERE LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description) ~ $1
        GROUP BY e.id, u.id, u.user_name, u.first_name, u.last_name, e.title, e.description
        ORDER BY (LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description) <-> $2) ASC;
      `,
      [wordsRegex, wordsLike]
    );
    response.status(200).json(post);
  } catch (error) {
    console.error(error);
    response.status(500).end();
  }
};
