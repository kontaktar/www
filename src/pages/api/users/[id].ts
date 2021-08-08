import * as admin from "firebase-admin";
import pgp from "pg-promise";
import { IronSession, UserSessionStorage } from "types";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";
import { withMiddleware, withUserAccess } from "utils/apiMiddleware";
import database from "utils/database";
import { debug, debugError } from "helpers/debug";
import { removeEmpty } from "helpers/objects";

const { helpers: pgpHelpers } = pgp({ capSQL: true });

if (!admin.apps.length) {
  admin.initializeApp({
    ...firebaseAdminInitConfig,
    credential: admin.credential.cert({
      ...firebaseAdminInitConfig.credential
    })
  });
}

const UserById = withSession(async (request, response) => {
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
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).json("Not found");
      }
      return;
    }
  }
  if (method === "DELETE") {
    const deleteUser = withUserAccess((handler) => {
      return async (_request, _res) => {
        try {
          await database.one(
            "DELETE FROM addresses WHERE user_id = $1;DELETE FROM users WHERE id = $1 RETURNING *",
            [userId]
          );
          _res.status(200).json({ userId });
        } catch (error) {
          if (error instanceof pgp.errors.QueryResultError) {
            _res.status(404).end();
          } else {
            _res.status(500).end();
            throw new Error(`DELETE USER 500:  ${error}`);
          }
        }
      };
    });
    deleteUser(request, response);
  }
  // This handles both "register"
  // and last_login update
  if (method === "PUT") {
    if (!request?.headers?.authorization) {
      response.status(401).json({ message: "Missing Authorization header" });
      return;
    }
    admin
      .auth()
      .verifyIdToken(request?.headers?.authorization)
      .then((decodedToken) => {
        const { uid } = decodedToken;

        // do something here?
        // if (user?.firebase?.id) {
        //   console.log("uid", uid);
        //   if (body.firebase.id !== uid) {
        //     response.status(400).json({ message: "User doesnt match" });
        //   }
        // }
      })
      .catch((error) => {
        debugError(error);
      });

    if (body && body.id && body.userName) {
      // Add to iron-session.
      let userData;
      let userSessionStorage: UserSessionStorage;
      try {
        userData = request.session.get(IronSession.UserSession);
        userSessionStorage = {
          ...userData,
          details: {
            ...userData?.details,
            ...body
          },
          isLoggedIn: true
        };
      } catch (error) {
        debugError("EditUser: Can't get user data", error);
      }
      debug("EditUser:User:", userSessionStorage);
      try {
        debug("EditUser:Added to iron-session");
        request.session.set(IronSession.UserSession, userSessionStorage);
        await request.session.save();
        response.status(200);
      } catch (error) {
        debugError("EditUser:Failed to set iron session", error);
        response.status(500).json(error);
      }
    }

    // withUserAccess(request, response);

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
      country = null,
      lastLogin: last_login = null
    } = body;

    const userVariablesToUpdate = removeEmpty({
      ssn,
      user_name,
      first_name,
      last_name,
      email,
      website,
      phone_number,
      last_login
    });
    const addressVariablesToUpdate = removeEmpty({
      postal_code,
      street_name,
      city,
      country
    });

    try {
      if (Object.keys(userVariablesToUpdate).length > 0) {
        const userQuery = pgpHelpers.update(
          userVariablesToUpdate,
          null,
          "users"
        );
        const userCondition = pgp.as.format(
          " WHERE id = $1 RETURNING *",
          userId
        );

        await database.one(userQuery + userCondition);
      }
      if (Object.keys(addressVariablesToUpdate).length > 0) {
        const addressQuery = pgpHelpers.update(
          addressVariablesToUpdate,
          null,
          "addresses"
        );
        const addressCondition = pgp.as.format(
          " WHERE user_id = $1 RETURNING *",
          userId
        );
        await database.one(addressQuery + addressCondition);
      }
      response.status(200).json({ userId });
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).end();
        // throw new Error(`UPDATE USER 404: ${error}`);
      } else {
        response.status(500).end();
        throw new Error(`UPDATE USER 500: ${error}`);
      }
    }
  } else {
    response.status(400).end();
  }
});

export default UserById;
