import * as admin from "firebase-admin";
import pgp from "pg-promise";
import { IronSession, UserSessionStorage } from "types";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";
import { withMiddleware /* , withUserAccess*/ } from "utils/apiMiddleware";
import database from "utils/database";
import { debug, debugError } from "helpers/debug";
import { registerErrors } from "helpers/errorMessages";

if (!admin.apps.length) {
  admin.initializeApp({
    ...firebaseAdminInitConfig,
    credential: admin.credential.cert({
      ...firebaseAdminInitConfig.credential
    })
  });
}
const Users = withSession(async (request, response) => {
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
      } else if (query && query.email) {
        data = await database.one(
          "SELECT u.id, u.user_name, u.first_name, u.last_name, u.email, u.website, u.phone_number, u.created_at, u.last_login, u.ssn, a.postal_code, a.street_name, a.city, a.country FROM users u LEFT JOIN addresses a ON a.user_id = u.id WHERE u.email = $1;",
          query.email
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
      } else if (query && query.firebaseid) {
        data = await database.one(
          "SELECT u.user_id FROM firebase_user_map u WHERE u.firebase_id = $1;",
          query.firebaseid
        );
        response.status(200).json({
          userId: data?.user_id
        });
      } else if (query && query.phoneNumber) {
        // TODO: do withUserAccess
        // the plus is stripped when used as a query param
        const phoneNumberWithPlus = `+${query.phoneNumber}`.replace(" ", "");
        data = await database.one(
          "SELECT u.id, u.user_name, u.first_name, u.last_name, u.email, u.website, u.phone_number, u.created_at, u.last_login, u.ssn, a.postal_code, a.street_name, a.city, a.country FROM users u LEFT JOIN addresses a ON a.user_id = u.id WHERE u.phone_number = $1;",
          phoneNumberWithPlus
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
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).json({ message: error.message });
        console.error(`GET USERNAME 404: ${error}`);
      } else {
        response.status(500).json({ message: error.message });
        console.error(`GET USERNAME 505: ${error}`);
      }
    }
  }

  if (method === "POST") {
    let newUserId;
    withMiddleware(request, response);

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
      country,
      createdAt,
      firebaseId
    } = body;

    if (!request?.headers?.authorization) {
      response.status(401).json({ message: "No Authorization header" });
      return;
    }
    admin
      .auth()
      .verifyIdToken(request?.headers?.authorization)
      .then((decodedToken) => {
        const { uid } = decodedToken;

        // do something here?

        if (firebaseId !== uid) {
          response.status(401).json({ message: "User doesnt match" });
        }
      })
      .catch((error) => {
        debugError(error);
      });

    if (!phoneNumber) {
      console.error("Phonenumber missing");
      response.status(500).end();
    }

    try {
      const {
        id: userId
      } = await database.one(
        "INSERT INTO users(ssn, user_name, first_name, last_name, email, website, phone_number, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [
          ssn,
          userName,
          firstName,
          lastName,
          email,
          website,
          phoneNumber,
          createdAt
        ]
      );
      database.none(
        "INSERT INTO addresses(user_id, postal_code, street_name, city, country) VALUES($1, $2, $3, $4, $5)",
        [userId, postalCode, streetName, city, country]
      );
      newUserId = userId;
    } catch (error) {
      if (error.message.includes("users_ssn_key")) {
        error.message = registerErrors.EXISTS_SSN;
      }
      if (error.message.includes("users_email_key")) {
        error.message = registerErrors.EXISTS_EMAIL;
      }
      if (error.message.includes("users_user_name_key")) {
        error.message = registerErrors.EXISTS_USER_NAME;
      }
      response.status(404).json({ message: error.message });
    }

    // Connect firebaseUser
    debug("POST:/api/users:new userId", newUserId);
    if (body.firebaseId && newUserId) {
      try {
        await database.none(
          "INSERT INTO firebase_user_map(user_id, firebase_id) VALUES($1, $2)",
          [newUserId, body.firebaseId]
        );

        const userData = request.session.get(IronSession.UserSession);
        console.log("userData from UserStorage", userData);
        const updatedUserData: UserSessionStorage = {
          ...userData,
          details: {
            id: newUserId,
            ...userData?.details,
            ...body
          },
          firebase: {
            ...userData?.firebase,
            id: body.firebaseId
          }
        };

        try {
          request.session.set(IronSession.UserSession, updatedUserData);
          await request.session.save();
        } catch (error) {
          response.status(500).json(error);
          debugError(`setting to iron: ${error.message}`);
          throw new Error(`Failed to save to session storage`);
        }
        response.json({ userId: newUserId });
      } catch (error) {
        console.error("FIREBASE_USER_MAP ERROR", error);
        response.status(500).end();
      }
    }
  } else {
    response.status(505).end();
  }
});
export default Users;
