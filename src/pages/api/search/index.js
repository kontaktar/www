const database = require("../../../utils/database").instance;

export default async (_, response) => {
  try {
    const get = await database.any(
      `SELECT
      e.id as experience_id, u.id as user_id, u.user_name, u.first_name, u.last_name, e.title, e.description, e.years, e.months
    FROM experiences e
    LEFT JOIN users u ON e.user_id = u.id
    WHERE e.published IS TRUE;`
    );
    response.status(200).json(get);
  } catch (error) {
    response.status(500).end();
    throw new Error(error);
  }
};
