import { Prisma, User } from "@prisma/client";
import prisma from "database";
import { mapSearchResult } from "database/maps";
import type { NextApiHandler } from "next";
import { debugError } from "helpers/debug";

export const searchAll: NextApiHandler = async (request, response) => {
  await prisma.experience
    .findMany({
      where: {
        published: true
      },
      include: {
        User: {
          select: {
            userName: true
          }
        }
      }
    })
    .then(async (data) => {
      response.status(200).json(mapSearchResult(data));
    })
    .catch((error) => {
      debugError(error);
      response.status(401).json({ message: error });
    });
};
export const searchWithParams: NextApiHandler = async (request, response) => {
  const {
    query: { params }
  } = request;

  const arraySearch = (params as string)
    .split(" ")
    .filter((arr) => arr !== "")
    .map((string) => `%${string}%`);

  console.log("arraySearch", arraySearch);
  console.log("arraySearch", Prisma.join(arraySearch));
  console.log("arraySearch", Prisma.join(arraySearch).values);

  await prisma
    .$queryRawUnsafe(
      `
      SELECT
        e."id" as experienceId,
        u."id" as userId,
        u."userName",
        u."firstName",
        u."lastName",
        e."title",
        e."description",
        e."years",
        e."months",
        RANK () OVER (
          ORDER BY e."title", e."description", u."userName", u."firstName"
        ) rank_number
      FROM "User" u
      LEFT JOIN "Experience" e ON e."userId" = u."id"
      WHERE
        (e."published" = true) AND
        (u."userName" ILIKE ANY( $1 )
          OR u."firstName" ILIKE ANY( $1 )
          OR u."lastName" ILIKE ANY( $1 )
          OR e."title" ILIKE ANY( $1 )
          OR e."description" ILIKE ANY( $1 )
        )
      ORDER BY
        "rank_number" ASC,
        e."title" ASC,
        e."description" ASC,
        u."firstName" ASC,
        u."lastName" ASC,
        u."userName" ASC`,
      Prisma.join(arraySearch).values
    )
    .then(async (data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      debugError(error);
      response.status(401).json({ message: error });
    });
};
