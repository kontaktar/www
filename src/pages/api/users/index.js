const database = require("utils/database").instance;

export default async ({ body, method }, response) => {
  if (method === "GET") {
    try {
      const get = await database.many("SELECT * FROM users;");
      response.status(200).json(get);
    } catch (error) {
      console.error(error);
      response.status(500).end();
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
      console.error("POST USER", error);
      response.status(500).end();
    }
  } else {
    response.status(400).end();
  }
};
