const database = require("utils/database").instance;

// export default async ({ method, query: { id } }, response) => {
export default async (request, response) => {
  const {
    body,
    method,
    query: { id: userId }
  } = request;
  if (method === "GET") {
    try {
      const get = await database.any(
        "SELECT e.id, e.title, e.description, e.years, e.months FROM experiences e LEFT JOIN users u ON e.user_id = u.id WHERE u.id = $1",
        userId
      );
      response.status(200).json(get);
    } catch (error) {
      console.error(error);
      response.status(500).end();
    }
  }
  if (method === "POST") {
    const { title, description, years, months, published } = body;
    try {
      const { id: experienceId } = await database.one(
        "INSERT INTO experiences(user_id, title, description, years, months, published) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
        [userId, title, description, years, months, published]
      );
      response.status(200).json({ experienceId });
    } catch (error) {
      console.error("POST EXPERIENCE", error);
      response.status(500).end();
    }
  }
};
