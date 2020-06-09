import { withMiddleware } from "utils/apiMiddleware";

const database = require("utils/database").instance;

export default async (request, response) => {
  await withMiddleware(request, response);
  const { body, method } = request;
  if (method === "GET") {
    try {
      const get = await database.many("SELECT * FROM users;");
      response.status(200).json(get);
    } catch (error) {
      response.status(500).end();
      throw new Error("GET USER", error);
    }
  }

  if (method === "POST") {
    const {
      ssn,
      userName,
      firstName,
      lastName,
      email,
      website,
      phoneNumber,
      postalCode,
      streetName,
      city,
      country
    } = body;
    try {
      const { id: userId } = await database.one(
        "INSERT INTO users(ssn, user_name, first_name, last_name, email, website, phone_number) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [ssn, userName, firstName, lastName, email, website, phoneNumber]
      );
      database.none(
        "INSERT INTO addresses(user_id, postal_code, street_name, city, country) VALUES($1, $2, $3, $4, $5)",
        [userId, postalCode, streetName, city, country]
      );
      response.status(200).json({ userId });
    } catch (error) {
      response.status(500).end();
      throw new Error("POST USER", error);
    }
  } else {
    response.status(400).end();
  }
};
