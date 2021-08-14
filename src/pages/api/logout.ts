import * as admin from "firebase-admin";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";

if (!admin.apps.length) {
  admin.initializeApp({
    ...firebaseAdminInitConfig,
    credential: admin.credential.cert({
      ...firebaseAdminInitConfig.credential
    })
  });
}

const Logout = withSession(async (request, response) => {
  try {
    await request.session.destroy();
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
  return response.status(200).json({ isLoggedIn: false });
});

export default Logout;
