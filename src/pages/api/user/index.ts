import { PrismaClient } from "@prisma/client";
import * as admin from "firebase-admin";
import { setUserPhoneNumber } from "providers/LoginFormProvider.reducer";
import type { NextApiResponse } from "next";
import { IronSession } from "types";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";
import { debug, debugError } from "helpers/debug";

const prisma = new PrismaClient();
if (!admin.apps.length) {
  admin.initializeApp({
    ...firebaseAdminInitConfig,
    credential: admin.credential.cert({
      ...firebaseAdminInitConfig.credential
    })
  });
}

export default withSession(async (request, response) => {
  const { body, method, query } = request;
  if (method === "GET") {
    const userData = request.session?.get(IronSession.UserSession);
    if (userData) {
      response.json({
        isLoggedIn: true,
        ...userData
      });
    } else {
      response.json({
        isLoggedIn: false
      });
    }
  } else if (method === "POST") {
    let newUserId;

    // if (!request?.headers?.authorization) {
    //   response.status(401).json({ message: "Missing Authorization header" });
    //   return;
    // }
    // admin
    //   .auth()
    //   .verifyIdToken(request?.headers?.authorization)
    //   .then((decodedToken) => {
    //     const { uid } = decodedToken;

    //     if (body.firebaseId !== uid) {
    //       response.status(401).json({ message: "User doesnt match" });
    //     }
    //   })
    //   .catch((error) => {
    //     debugError(error);
    //   });

    const user = await prisma.user
      .create({
        data: {
          userName: body.userName,
          firstName: body.firstName,
          lastName: body.lastName,
          ssn: body.ssn,
          userPhoneNumber: {
            create: {
              phoneNumber: body.phoneNumber
            }
          },
          userFirebaseMap: {
            create: {
              firebaseId: body.firebaseId
            }
          },
          userAddress: {
            create: {
              postalCode: body?.postalCode,
              streetName: body?.streetName,
              city: body?.city,
              country: body?.country
            }
          }
        }
      })
      .catch((err) => console.error("ERROR", err));
    const users = await prisma.user
      .findMany()
      .catch((err) => console.error("ERROR", err));
    console.log("users", users);
    console.log("user", user);
    response.json(users);
  }
});
