// ./pages/api/login
import * as admin from "firebase-admin";
import { IronSession, UserSessionStorage } from "types";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";
import { debugError } from "helpers/debug";
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
    // bypass firebase on localhost
    if (!shouldBypassFirebaseOnDevelopment) {
      if (!request?.headers?.authorization) {
        throw new Error(`Failed to login user`);
      }

      admin
        .auth()
        .verifyIdToken(request?.headers?.authorization)
        .then((decodedToken) => {
          const { uid } = decodedToken;
          // do something here?
          console.log("uid", uid);
          // ...
        })
        .catch((error) => {
          debugError(error);
        });
    }

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
    return response.status(500).json({ error: error.message });
  }
  return response.status(200).json(body);
});

export default Login;
