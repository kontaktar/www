import { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";
import cors from "lib/cors";

export async function middleware(req: NextRequest, next: NextApiHandler) {
  console.log("geo:", req.geo);
  console.log("ip:", req.ip);
  console.log("ua:", req.ua);

  let res = new NextResponse();

  cors(req, res);

  // Unsupported APIs:
  // https://nextjs.org/docs/api-reference/edge-runtime#unsupported-apis

  return NextResponse.next();
}
