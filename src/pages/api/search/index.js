import { withMiddleware } from "utils/apiMiddleware";

const database = require("../../../utils/database").instance;

export default async (_request, response) => {
  await withMiddleware(_request, response);
  try {
    const data = await database.any(
      `SELECT
      e.id as experience_id,
      u.id as user_id,
      u.user_name,
      u.first_name,
      u.last_name,
      e.title,
      e.description,
      e.years,
      e.months
    FROM experiences e
    LEFT JOIN users u ON e.user_id = u.id
    WHERE e.published IS TRUE;`
    );
    const mappedData = data.map(card => {
      return {
        userId: card.user_id,
        userName: card.user_name,
        firstName: card.first_name,
        lastName: card.last_name,
        experienceId: card.experience_id,
        ...card
      };
    });
    response.status(200).json(mappedData);
  } catch (error) {
    response.status(500).end();
    throw new Error(error);
  }
};
