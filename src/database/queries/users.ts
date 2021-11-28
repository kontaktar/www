import prisma from "database";
import type { NextApiHandler } from "next";

export const getAllUsernames: NextApiHandler = async (request, response) => {
  await prisma.user
    .findMany({
      select: {
        userName: true
      }
    })
    .catch((error) => {
      response.status(401).json({ message: error });
      return;
    })
    .then((users) => {
      if (!users) {
        response.status(404).json({ message: "Not found" });
      } else {
        response.status(200).json(users);
      }
      return;
    });
};
