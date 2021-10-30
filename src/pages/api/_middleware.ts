import * as admin from "firebase-admin";
import { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";
import cors from "lib/cors";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";

export async function middleware(req: NextRequest, next: NextApiHandler) {
  console.log(req.geo);
  console.log(req.ip);
  console.log(req.ua);

  cors(req, new NextResponse());

  // TODO: THIS HERE WHEN RESOLVED
  // https://github.com/vercel/next.js/issues/30648
  // if (!admin.apps.length) {
  //   admin.initializeApp({
  //     ...firebaseAdminInitConfig,
  //     credential: admin.credential.cert({
  //       ...firebaseAdminInitConfig.credential
  //     })
  //   });
  // }

  return NextResponse.next();
}
