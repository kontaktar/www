import { withMiddleware } from "utils/apiMiddleware";

const database = require("utils/database").instance;

export default async (request, response) => {
  await withMiddleware(request, response);
  const {
    query: { params }
  } = request;
  try {
    const words = params.split(" ");
    const wordsRegex = `(${words.join("|")})`;
    const wordsLike = `%${words.join("% <-> %")}%`;

    const data = await database.any(
      `
        SELECT
          e.id as experience_id, u.id as user_id, u.user_name, u.first_name, u.last_name, e.title, e.description, e.years, e.months
        FROM experiences e
        LEFT JOIN users u ON e.user_id = u.id
        WHERE e.published IS TRUE AND LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description) ~ $1
        GROUP BY e.id, u.id, u.user_name, u.first_name, u.last_name, e.title, e.description
        ORDER BY (LOWER(u.user_name || ' ' || u.first_name || ' ' || u.last_name || ' ' || e.title || ' ' || e.description) <-> $2) ASC;
      `,
      [wordsRegex, wordsLike]
    );
    const mappedData = data.map((card) => {
      return {
        userId: card.user_id,
        experienceId: card.experience_id,
        userName: card.user_name,
        firstName: card.first_name,
        lastName: card.last_name,
        ...card
      };
    });
    response.status(200).json(mappedData);
  } catch (error) {
    response.status(500).end();
    throw new Error(error);
  }
};
