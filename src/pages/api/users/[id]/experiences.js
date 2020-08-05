import { withMiddleware } from "utils/apiMiddleware";

const pgp = require("pg-promise");
const database = require("utils/database").instance;

// eslint-disable-next-line no-unused-vars
const { helpers: pgpHelpers } = pgp({ capSQL: true });

// export default async ({ method, query: { id } }, response) => {
export default async (request, response) => {
  await withMiddleware(request, response);
  const {
    body,
    method,
    query: { id: userId }
  } = request;
  if (method === "GET") {
    try {
      const get = await database.any(
        "SELECT e.id, e.title, e.description, e.years, e.months, e.published, e.order FROM experiences e WHERE e.user_id = $1",
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
      response.status(500).send({ error: error.message });
      console.log(error, error.name, error.message);
      throw new Error("POST EXPERIENCE", error);
    }
  }
  if (method === "PUT") {
    try {
      const cs = new pgpHelpers.ColumnSet(["?id", "order"], {
        table: "experiences"
      });
      // eslint-disable-next-line no-unused-vars
      const query =
        pgpHelpers.update(body, cs) +
        pgp.as.format(" WHERE v.id = t.id AND user_id = $1 RETURNING *", [
          userId
        ]);

      const experiences = database.any(query);

      response.status(200).json(experiences);
    } catch (error) {
      console.log(error, error.name, error.message);
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).end();
        throw new Error("UPDATE EXPERIENCES 404: ", error);
      } else {
        response.status(500).end();
        throw new Error("UPDATE EXPERIENCES 500: ", error);
      }
    }
  } else {
    response.status(400).end();
  }
};
