import * as admin from "firebase-admin";
// import pgp from "pg-promise";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";
import database from "utils/database";

// const { helpers: pgpHelpers } = pgp({ capSQL: true });

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
    query: { phoneNumber }
  } = request;
  if (method === "GET") {
    try {
      console.log("phoneNumber", phoneNumber);
      await database.one(
        "SELECT a.phone_number FROM admins a WHERE a.phone_number = $1",
        phoneNumber
      );

      response.status(200).json(true);
    } catch (error) {
      response.status(404).json(false);
    }
  }
});

export default GetAdmins;
