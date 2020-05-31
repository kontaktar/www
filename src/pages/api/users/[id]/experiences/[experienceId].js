/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { removeEmpty } from "helpers/objects";

const pgp = require("pg-promise");
const database = require("utils/database").instance;

const { helpers: pgpHelpers } = pgp({ capSQL: true });

export default async (
  { body, method, query: { experienceId, id: userId } },
  response
) => {
  if (method === "GET") {
    // I don't think this one is needed
    try {
      const get = await database.one(
        "SELECT e.id, e.title, e.description, e.years, e.months, e.published FROM experiences e WHERE e.id = $1 AND e.user_id = $2",
        experienceId,
        userId
      );
      response.status(200).json(get);
    } catch (error) {
      console.error(error);
      response.status(500).end();
    }
  }

  if (method === "DELETE") {
    try {
      await database.one(
        "DELETE FROM experiences WHERE user_id = $1 AND id = $2 RETURNING *;",
        [userId, experienceId]
      );
      response.status(200).json({ userId, experienceId });
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        console.error("DELETE EXPERIENCE 404: ", error);
        response.status(404).end();
      } else {
        console.error("DELETE EXPERIENCE 500: ", error);
        response.status(500).end();
      }
    }
  }
  if (method === "PUT") {
    // I wish this was typescript
    const {
      id,
      title = null,
      description = null,
      years = null,
      months = null,
      published = false
    } = body;

    const experienceVariables = {
      id,
      title,
      description,
      years,
      months,
      published
    };

    const experienceVariablesToUpdate = removeEmpty(experienceVariables);

    try {
      const query = pgpHelpers.update(
        experienceVariablesToUpdate,
        null,
        "experiences"
      );
      console.log("EXXXXPPP", experienceVariablesToUpdate);
      const condition = pgp.as.format(
        " WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
      );

      const experience = await database.one(query + condition);
      console.log("experience", experience);
      response.status(200).json(experience);
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        console.error("UPDATE USER 404: ", error);
        response.status(404).end();
      } else {
        console.error("UPDATE USER 500: ", error);
        response.status(500).end();
      }
    }
  } else {
    response.status(400).end();
  }
};
