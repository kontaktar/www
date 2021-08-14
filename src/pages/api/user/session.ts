import * as admin from "firebase-admin";
import { IronSession, UserSessionStorage } from "types";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";
import { withMiddleware, withUserAccess } from "utils/apiMiddleware";
import { debug, debugError } from "helpers/debug";

if (!admin.apps.length) {
  admin.initializeApp({
    ...firebaseAdminInitConfig,
    credential: admin.credential.cert({
      ...firebaseAdminInitConfig.credential
    })
  });
}

const AddToSession = withSession(async (request, response) => {
  await withMiddleware(request, response);
  //   withUserAccess(request, response);
  const { body } = request;

  const userSession = request.session.get(IronSession.UserSession);
  const user: UserSessionStorage = {
    isLoggedIn: false, // this is only used to update user before registration, therefore isLogger
    ...userSession,
    details: {
      ...userSession?.details,
      ...body?.details
    },
    firebase: {
      ...userSession?.firebase,
      ...body?.firebase,
      token: request.headers.authorization
    }
  };
  debug("AddToSession", user);

  if (!request?.headers?.authorization) {
    response.status(401).json({ message: "Missing Authorization header" });
    return;
  }

  admin
    .auth()
    .verifyIdToken(request?.headers?.authorization)
    .then((decodedToken) => {
      const { uid } = decodedToken;

      if (user?.firebase?.id) {
        debug(
          "uid returned from IdToken verification on user registration session creation",
          uid
        );
        if (body.firebase.id !== uid) {
          response.status(400).json({ message: "User doesnt match" });
        }
      }
    })
    .catch((error) => {
      debugError(error);
    });

  try {
    await request.session.set(IronSession.UserSession, user);
    await request.session.save();
  } catch (error) {
    response.status(500).json(error);
    debugError(`setting to iron: ${error.message}`);
    throw new Error(`Failed to save to session storage`);
  }
  response.status(200).json(user);
});

export default AddToSession;
