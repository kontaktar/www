import { PrismaClient } from "@prisma/client";
import * as admin from "firebase-admin";
import { queryResult } from "pg-promise";
import { IronSession, UserSessionStorage } from "types";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import withSession from "lib/sessions";

const prisma = new PrismaClient();

if (!admin.apps.length) {
  admin.initializeApp({
    ...firebaseAdminInitConfig,
    credential: admin.credential.cert({
      ...firebaseAdminInitConfig.credential
    })
  });
}

export default withSession(async (request, res) => {
  const { body, method, query } = request;
  if (method === "GET") {
    if (query?.userName) {
      const user = await prisma.user.findUnique({
        where: {
          userName: query?.userName as string
        }
      });
      console.log(user);
      res.json(user);
    }
  } else {
    // const userDataF = request.session.get(IronSession.UserSession);

    res.json();
  }
  await prisma.$disconnect();
});
