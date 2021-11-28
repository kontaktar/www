import prisma from "database";
import type { NextApiHandler } from "next";

export const getIsAdmin: NextApiHandler = async (request, response) => {
  const admin = await prisma.user
    .findFirst({
      where: {
        id: parseInt(request.query.id as string),
        userPhoneNumber: {
          phoneNumber: request.query.phoneNumber
        },
        role: {
          equals: "ADMIN"
        }
      }
    })
    .catch((error) => {
      response.status(401).json({ message: error });
    })
    .then((admin) => {
      if (!admin) {
        response.status(200).json({ isAdmin: false });
      } else {
        response.status(200).json({ isAdmin: true });
      }
    });
};
