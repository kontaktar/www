import { withMiddleware } from "utils/apiMiddleware";
import { removeEmpty } from "helpers/objects";

const pgp = require("pg-promise");
const database = require("utils/database").instance;

const { helpers: pgpHelpers } = pgp({ capSQL: true });

export default async (request, response) => {
  await withMiddleware(request, response);
  const {
    body,
    method,
    query: { id: userId }
  } = request;
  if (method === "GET") {
    try {
      const data = await database.one(
        "SELECT u.id, u.user_name, u.first_name, u.last_name, u.email, u.website, u.phone_number, u.created_at, u.last_login, u.ssn, a.postal_code, a.street_name, a.city, a.country FROM users u LEFT JOIN addresses a ON a.user_id = u.id WHERE u.id=$1",
        userId
      );
      response.status(200).json({
        userName: data.user_name,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        website: data.website,
        phoneNumber: data.phone_number,
        createdAt: data.created_at,
        lastLogin: data.last_login,
        ssn: data.ssn,
        postalCode: data.postal_code,
        streetName: data.street_name,
        city: data.city,
        country: data.country
      });
    } catch (error) {
      response.status(500).end();
      throw new Error(error);
    }
  }
  if (method === "DELETE") {
    try {
      await database.one(
        "DELETE FROM addresses WHERE user_id = $1;DELETE FROM users WHERE id = $1 RETURNING *",
        [userId]
        // (row) => {
        //   user = row;
        // }
      );
      response.status(200).json({ userId });
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).end();
        throw new Error("DELETE USER 404: ", error);
      } else {
        response.status(500).end();
        throw new Error("DELETE USER 500: ", error);
      }
    }
  }
  if (method === "PUT") {
    // I wish this was typescript
    const {
      ssn = null,
      userName: user_name = null,
      firstName: first_name = null,
      lastName: last_name = null,
      email = null,
      website = null,
      phoneNumber: phone_number = null,
      postalCode: postal_code = null,
      streetName: street_name = null,
      city = null,
      country = null
    } = body;

    const userVariables = {
      ssn,
      user_name,
      first_name,
      last_name,
      email,
      website,
      phone_number
    };

    const addressVariables = {
      postal_code,
      street_name,
      city,
      country
    };

    const userVariablesToUpdate = removeEmpty(userVariables);
    const addressVariablesToUpdate = removeEmpty(addressVariables);

    try {
      const userQuery = pgpHelpers.update(userVariablesToUpdate, null, "users");
      const addressQuery = pgpHelpers.update(
        addressVariablesToUpdate,
        null,
        "addresses"
      );
      const userCondition = pgp.as.format(" WHERE id = $1 RETURNING *", userId);
      const addressCondition = pgp.as.format(
        " WHERE user_id = $1 RETURNING *",
        userId
      );
      await database.one(userQuery + userCondition);
      await database.one(addressQuery + addressCondition);

      response.status(200).json({ userId });
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).end();
        throw new Error("UPDATE USER 404: ", error);
      } else {
        response.status(500).end();
        throw new Error("UPDATE USER 500: ", error);
      }
    }
  } else {
    response.status(400).end();
  }
};
