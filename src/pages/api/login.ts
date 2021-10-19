// ./pages/api/login
import * as admin from "firebase-admin";
import { IronSession, UserSessionStorage } from "types";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";
import { debug, debugError } from "helpers/debug";
import { shouldBypassFirebaseOnDevelopment } from "helpers/firebase";

if (!admin.apps.length) {
  admin.initializeApp({
    ...firebaseAdminInitConfig,
    credential: admin.credential.cert({
      ...firebaseAdminInitConfig.credential
    })
  });
}

const Login = withSession(async (request, response) => {
  await withMiddleware(request, response);
  const { body } = request;
  try {
    if (!request?.headers?.authorization) {
      response
        .status(401)
        .json({ messsage: "Missing Authorization header" })
        .end();
      return;
    }

    admin
      .auth()
      .verifyIdToken(request?.headers?.authorization)
      .then((decodedToken) => {
        const { uid } = decodedToken;
        // do something here?
        // TODO: this is the firebase?.id, maybe compare
        debug("uid returned from IdToken verification on login", uid);
        // ...
      })
      .catch((error) => {
        debugError(error);
      });

    const user: UserSessionStorage = {
      details: body,
      isLoggedIn: true,
      firebase: {
        token: request.headers.authorization
      }
    };

    try {
      request.session.set(IronSession.UserSession, user);
      await request.session.save();
    } catch (error) {
      response.status(500).json(error);
      debugError(`setting to iron: ${error.message}`);
      throw new Error(`Failed to save to session storage`);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
  response.status(200).json(body);
});

export default Login;
