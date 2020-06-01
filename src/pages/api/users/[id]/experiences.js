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
        "SELECT e.id, e.title, e.description, e.years, e.months, e.published FROM experiences e WHERE e.user_id = $1",
        userId
      );
      response.status(200).json(get);
    } catch (error) {
      response.status(500).end();
      throw new Error(error);
    }
  }
  if (method === "POST") {
    try {
      const {
        id,
        title,
        description,
        years,
        months,
        published
      } = await database.one(
        "INSERT INTO experiences(user_id, title, description, years, months, published) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          userId,
          body.title,
          body.description,
          body.years,
          body.months,
          !!body.published
        ]
      );
      response
        .status(200)
        .json({ id, title, description, years, months, published });
    } catch (error) {
      response.status(500).end();
      throw new Error("POST EXPERIENCE", error);
    }
  } else {
    response.status(400).end();
  }
};
