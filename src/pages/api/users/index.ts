import bcrypt from "bcryptjs";
import { withMiddleware, withUserAccess } from "utils/apiMiddleware";
import database from "utils/database";

const Users = async (request, response) => {
  await withMiddleware(request, response);
  const { body, method, query } = request;
  if (method === "GET") {
    try {
      let data;
      if (query && query.userName) {
        data = await database.one(
          "SELECT u.id, u.user_name, u.first_name, u.last_name, u.email, u.website, u.phone_number, u.created_at, u.last_login, u.ssn, a.postal_code, a.street_name, a.city, a.country FROM users u LEFT JOIN addresses a ON a.user_id = u.id WHERE u.user_name = $1;",
          query.userName
        );
        response.status(200).json({
          id: data.id,
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
      } else {
        data = await database.many(
          "SELECT u.id, u.user_name, u.first_name, u.last_name, u.email, u.website, u.phone_number, u.created_at, u.last_login, u.ssn, a.postal_code, a.street_name, a.city, a.country FROM users u LEFT JOIN addresses a ON a.user_id = u.id;"
        );
        response.status(200).json(
          data.map((d) => {
            return {
              id: d.id,
              userName: d.user_name,
              firstName: d.first_name,
              lastName: d.last_name,
              email: d.email,
              website: d.website,
              phoneNumber: d.phone_number,
              createdAt: d.created_at,
              lastLogin: d.last_login,
              ssn: d.ssn,
              postalCode: d.postal_code,
              streetName: d.street_name,
              city: d.city,
              country: d.country
            };
          })
        );
      }
    } catch (error) {
      response.status(500).end();
      throw new Error(`GET USER: ${error}`);
    }
  }

  if (method === "POST") {
    withUserAccess(request, response);
    const {
      ssn,
      userName,
      password,
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const {
        id: userId
      } = await database.one(
        "INSERT INTO users(ssn, user_name, password, first_name, last_name, email, website, phone_number) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [
          ssn,
          userName,
          hashedPassword,
          firstName,
          lastName,
          email,
          website,
          phoneNumber
        ]
      );
      database.none(
        "INSERT INTO addresses(user_id, postal_code, street_name, city, country) VALUES($1, $2, $3, $4, $5)",
        [userId, postalCode, streetName, city, country]
      );
      response.status(200).json({ userId });
    } catch (error) {
      response.status(500).send({ error: error.message });
      // console.log(error, error.name, error.message);
      throw new Error(`POST USER: ${error}`);
    }
  } else {
    response.status(400).end();
  }
};

export default Users;
