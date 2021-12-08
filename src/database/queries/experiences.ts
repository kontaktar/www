import prisma from "database";
import type { NextApiResponse } from "next";
import type { Experiences, NextIronRequest } from "types";
import { IronSession } from "types";
import { debugError } from "helpers/debug";

const experienceSelect = {
  id: true,
  title: true,
  description: true,
  years: true,
  months: true,
  published: true,
  order: true,
  editedAt: true
};
export const getUserExperiences = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const {
    query: { id: userId },
    session
  } = request;
  if (
    session.get(IronSession.UserSession)?.details?.id?.toString() === userId
  ) {
    await prisma.experience
      .findMany({
        where: {
          userId: parseInt(userId as string)
        },
        select: experienceSelect
      })
      .catch((error) => {
        debugError("error", error);
        response.status(401).json({ message: error });
        return;
      })
      .then((experiences) => {
        if (!experiences) {
          response.status(404).json({ message: "Not found" });
        } else {
          response.status(200).json(experiences);
        }
        return;
      });
  } else {
    await prisma.experience
      .findMany({
        where: {
          userId: parseInt(userId as string),
          published: true
        },
        select: experienceSelect
      })
      .catch((error) => {
        debugError("error", error);
        response.status(401).json({ message: error });
        return;
      })
      .then((experiences) => {
        if (!experiences) {
          response.status(404).json({ message: "Not found" });
        } else {
          response.status(200).json(experiences);
        }
        return;
      });
  }
};

// Works
export const createUserExperience = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const {
    body,
    query: { id: userId }
  } = request;

  await prisma.experience
    .create({
      data: {
        User: {
          connect: {
            id: parseInt(userId as string)
          }
        },
        title: body?.title,
        description: body?.description,
        years: parseInt(body?.years) || 0,
        months: parseInt(body?.months) || 0,
        published: !!body.published,
        editedAt: new Date().toISOString()
      }
    })
    .catch((error) => {
      debugError("error", error);
      response.status(401).json({ message: error });
      return;
    })
    .then((experiences) => {
      if (!experiences) {
        response.status(404).json({ message: "Not found" });
      } else {
        response.status(200).json(experiences);
      }
      return;
    });
};

// TODO: test
export const editUserExperiencesOrder = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const {
    body,
    query: { id: userId }
  } = request;

  await prisma.experience
    .updateMany({
      data: {
        order: body?.order
      },
      where: {
        userId: parseInt(userId as string),
        id: body.id
      }
    })
    .catch((error) => {
      debugError("error", error);
      response.status(401).json({ message: error });
      return;
    })
    .then((experiences) => {
      if (!experiences) {
        response.status(404).json({ message: "Not found" });
      } else {
        response.status(200).json(experiences);
      }
      return;
    });
};

// Works
export const deleteExperienceById = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const {
    query: { experienceId, id: userId }
  } = request;
  try {
    await prisma.experience
      .delete({
        where: {
          id: parseInt(experienceId as string)
        }
      })
      .catch((error) => {
        debugError("deleteExperienceById", error);
        response.status(401).json({ message: error });
        return;
      })
      .then(async () => {
        response.status(200).json({ userId, experienceId });
        return;
      });
  } catch (error) {
    debugError("::deleteExperienceById", error);
  }
};

// Works
export const editExperienceById = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const {
    body,
    query: { experienceId, id: userId }
  } = request;
  try {
    await prisma.experience
      .update({
        where: {
          id: parseInt(experienceId as string)
        },
        data: {
          title: body?.title,
          description: body?.description,
          years: parseInt(body?.years),
          months: parseInt(body?.months),
          published: !!body?.published,
          editedAt: new Date().toISOString()
        }
      })
      .catch((error) => {
        debugError("editExperienceById", error);
        response.status(401).json({ message: error });
        return;
      })
      .then(async () => {
        response.status(200).json({ userId, experienceId });
        return;
      });
  } catch (error) {
    debugError("::editExperienceById", error);
  }
};
