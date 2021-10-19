import * as admin from "firebase-admin";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";
import database from "utils/database";
import { debugError } from "helpers/debug";

if (!admin.apps.length) {
  admin.initializeApp({
    ...firebaseAdminInitConfig,
    credential: admin.credential.cert({
      ...firebaseAdminInitConfig.credential
    })
  });
}

const GetAdmins = withSession(async (request, response) => {
  await withMiddleware(request, response);
  const {
    method,
    query: { phoneNumber, id }
  } = request;
  if (method === "GET" && phoneNumber && id) {
    try {
      await database.one(
        "SELECT a.phone_number FROM admins a WHERE a.phone_number = $1 AND a.user_id = $2",
        [phoneNumber, id]
      );

      response.status(200).json({ isAdmin: true });
    } catch (error) {
      if (error.message === "No data returned from the query.") {
        response.status(200).json({ isAdmin: false });
      } else {
        debugError("ERROR:GetAdmins ", error);
        console.error(error);
        response.status(404).json({ message: "GetAdmins: UNKNOWN-ERROR" });
      }
    }
  }
});

export default GetAdmins;
