import * as admin from "firebase-admin";
import pgp from "pg-promise";
import { IronSession, UserSessionStorage } from "types";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";
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

const UpdateUserLastLoginById = withSession(async (request, response) => {
  await withMiddleware(request, response);
  const {
    body,
    method,
    query: { id: userId }
  } = request;
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
        // TODO: verify
      })
      .catch((error) => {
        debugError("UPDATING USER LAST LOGIN, Cant verify user", error);
      });

    if (body && body.lastLogin) {
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
        debugError("UpdateUserLastLoginById: Can't get user data", error);
      }
      debug("UpdateUserLastLoginById:User:", userSessionStorage);
      try {
        debug(
          "UpdateUserLastLoginById:Added to iron-session",
          userSessionStorage
        );
        request.session.set(IronSession.UserSession, userSessionStorage);
        await request.session.save();
        response.status(200);
      } catch (error) {
        debugError("UpdateUserLastLoginById:Failed to set iron session", error);
        response.status(500).json(error);
      }
    }

    const { lastLogin: last_login = null } = body;

    const userVariablesToUpdate = removeEmpty({
      last_login
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
    response.status(404);
  }
});

export default UpdateUserLastLoginById;
