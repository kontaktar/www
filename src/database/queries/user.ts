import prisma from "database";
import type { NextApiResponse } from "next";
import type { NextIronRequest, UserSessionStorage } from "types";
import { IronSession } from "types";
import { saveUserToSession } from "lib/sessions";
import { debug, debugError } from "helpers/debug";
import { registerErrors } from "helpers/errorMessages";

const userSelect = {
  id: true,
  userName: true,
  lastName: true,
  firstName: true,
  ssn: true,
  userMetaData: true,
  userPhoneNumber: true,
  userStatistics: true,
  userAddress: true
};

const userFullSelect = {
  id: true,
  userName: true,
  lastName: true,
  firstName: true,
  ssn: true,
  userMetaData: true,
  userFirebaseMap: true,
  userPhoneNumber: true,
  userStatistics: true,
  userAddress: true
};
export const getUserByUserName = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  await prisma.user
    .findUnique({
      where: {
        userName: request.query.userName as string
      },
      select: userSelect
    })
    .catch((error) => {
      debugError("error", error);
      response.status(401).json({ message: error });
      return;
    })
    .then((user) => {
      if (!user) {
        response.status(404).json({ message: "Not found" });
      } else {
        response.status(200).json(user);
      }
      return;
    });
};
export const getUserByPhoneNumber = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const {
    query: { phoneNumber }
  } = request;
  // TODO: SUPPORT country extension, this is hardcoded only to support 354
  // maybe it's crazy to store it seperate in our db, because firebase stores it as one string, how to dynamically know if there is a countrycoded in the front of the number?

  let fullPhoneNumber =
    phoneNumber && typeof phoneNumber !== "undefined"
      ? `+${request.query.phoneNumber.toString()}`.replace(" ", "")
      : "";

  await prisma.userPhoneNumber
    .findUnique({
      where: {
        phoneNumber: fullPhoneNumber
      },
      select: {
        User: {
          select: userSelect
        }
      }
    })
    .catch((error) => {
      debugError("error", error);
      response.status(401).json({ message: error });
      return;
    })
    .then((user) => {
      if (!user) {
        response.status(404).json({ message: "Not found" });
      } else {
        response.status(200).json({ ...user });
      }
      return;
    });
};
export const getUserById = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  await prisma.user
    .findUnique({
      where: {
        id: parseInt(request.query.id as string)
      },
      select: userSelect
    })
    .catch((error) => {
      debugError("error", error);
      response.status(401).json({ message: error });
      return;
    })
    .then((user) => {
      if (!user) {
        response.status(404).json({ message: "Not found" });
      } else {
        response.status(200).json(user);
      }
      return;
    });
};
export const getAuthorizedUserById = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  await prisma.user
    .findUnique({
      where: {
        id: parseInt(request.query.id as string)
      },
      select: userFullSelect
    })
    .catch((error) => {
      debugError("error", error);
      response.status(401).json({ message: error });
      return;
    })
    .then((user) => {
      if (!user) {
        response.status(404).json({ message: "Not found" });
      } else {
        response.status(200).json(user);
      }
      return;
    });
};

export const createUser = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const { body } = request;

  try {
    const user = await prisma.user
      .create({
        data: {
          userName: body.userName,
          firstName: body.firstName,
          lastName: body.lastName,
          ssn: body.ssn.toString(),
          userStatistics: {
            create: {
              lastLogin: new Date().toISOString()
            }
          },
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
      .catch((error) => {
        debugError("error", error);
        let errorMessage = error;
        // https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
        if (error.code === "P2002") {
          if (error.meta.target.includes("ssn")) {
            errorMessage = registerErrors.EXISTS_SSN;
          } else if (error.meta.target.includes("userName")) {
            errorMessage = registerErrors.EXISTS_USER_NAME;
          } else if (error.meta.target.includes("email")) {
            errorMessage = registerErrors.EXISTS_EMAIL;
          } else if (error.meta.target.includes("phoneNumber")) {
            errorMessage = registerErrors.EXISTS_PHONE_NUMBER;
          }
        }
        response.status(401).json({ message: errorMessage });
      })
      .then(async (user) => {
        debug("createdUser db response", user);
        const newUserToSession: UserSessionStorage = {
          isLoggedIn: true,
          details: {
            id: (user as any)?.id, // TODO: ??? why user.id doesn't exist!?
            phoneNumber: body.phoneNumber,
            ...user
          },
          firebase: {
            id: body.firebaseId
          }
        };
        debug("Created user added to storage:", newUserToSession);
        try {
          await saveUserToSession(request, response, newUserToSession);
          response.status(200).json({ userId: (user as any)?.id });
        } catch (error) {
          response.status(400).json({ message: error });
        }
      });
  } catch (error) {
    console.error("crateUsererror", error);
  }
};

export const deleteUserById = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const userIdToDelete = request?.body?.id || request?.query?.id;
  await prisma.user
    .delete({
      where: {
        id: parseInt(userIdToDelete as string)
      }
    })
    .catch((error) => {
      response.status(401).json({ message: error });
      return;
    })
    .then(async () => {
      // If the 'current' user is deleting himself, we want to end the session,
      const user: UserSessionStorage = request?.session?.get(
        IronSession.UserSession
      );

      if (userIdToDelete === user?.details?.id?.toString()) {
        await request.session.destroy();
      }
      response.status(200).json({ id: userIdToDelete });
      return;
    });
};

export const editUser = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const { body, query } = request;

  await prisma.user
    .update({
      where: {
        id: parseInt(query.id as string)
      },
      data: {
        userName: body?.userName,
        firstName: body?.firstName,
        lastName: body?.lastName,
        ssn: body?.ssn,
        userMetaData: {
          upsert: {
            update: {
              email: body?.email,
              website: body?.website
            },
            create: {
              email: body?.email,
              website: body?.website
            }
          }
        },
        userStatistics: {
          upsert: {
            update: {
              updatedAt: new Date().toISOString()
            },
            create: {
              updatedAt: new Date().toISOString()
            }
          }
        },
        userPhoneNumber: {
          update: {
            phoneNumber: body?.phoneNumber
          }
        },
        userAddress: {
          upsert: {
            update: {
              postalCode: body?.postalCode,
              streetName: body?.streetName,
              city: body?.city,
              country: body?.country
            },
            create: {
              postalCode: body?.postalCode,
              streetName: body?.streetName,
              city: body?.city,
              country: body?.country
            }
          }
        }
      },
      select: userSelect
    })
    .catch((error) => {
      debugError(error);
      let errorMessage = error;
      // https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
      if (error.code === "P2002") {
        if (error.meta.target.includes("ssn")) {
          errorMessage = registerErrors.EXISTS_SSN;
        } else if (error.meta.target.includes("userName")) {
          errorMessage = registerErrors.EXISTS_USER_NAME;
        } else if (error.meta.target.includes("email")) {
          errorMessage = registerErrors.EXISTS_EMAIL;
        } else if (error.meta.target.includes("phoneNumber")) {
          errorMessage = registerErrors.EXISTS_PHONE_NUMBER;
        }
      }
      response.status(401).json({ message: errorMessage });
    })
    .then(async (user) => {
      if (user) {
        let userData;

        try {
          userData = request.session.get(IronSession.UserSession);
        } catch (error) {
          debugError("EditUser: Can't get user data", error);
        }
        const editedUserForSession: UserSessionStorage = {
          ...userData,
          details: {
            ...userData?.details,
            ssn: userData?.details?.ssn || body?.ssn,
            userName: userData?.details?.userName || body?.userName,
            lastName: userData?.details?.lastName || body?.lastName,
            website: userData?.details?.website || body?.website,
            email: userData?.details?.email || body?.email
          }
        };
        try {
          await saveUserToSession(request, response, editedUserForSession);
          response.status(200).json({ userId: user.id });
        } catch (error) {
          response.status(400).json({ message: error });
          throw new Error(`Could not save to session stroage ${error}`);
        }
      }
    });
};

export const editUserLastLoginById = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const {
    body,
    method,
    query: { id: userId }
  } = request;

  await prisma.user
    .update({
      where: {
        id: parseInt(userId as string)
      },
      data: {
        userStatistics: {
          update: {
            lastLogin: body?.lastLogin
          }
        }
      },
      select: userSelect
    })
    .catch((error) => {
      debugError(error);
      response.status(401).json({ message: error });
    })
    .then(async (user) => {
      if (user) {
        let userData;

        try {
          userData = request.session.get(IronSession.UserSession);
        } catch (error) {
          debugError("UpdateUserLastLoginById: Can't get user data", error);
        }
        const updateUserLastLoginToSession = {
          ...userData,
          details: {
            ...userData?.details,
            lastLogin: body.lastLogin
          }
        };
        try {
          await saveUserToSession(
            request,
            response,
            updateUserLastLoginToSession
          );
          response.status(200).json(body);
          return;
        } catch (error) {
          debugError(
            "UpdateUserLastLoginById:Failed to set iron session",
            error
          );

          response.status(500).json({ message: error });
        }
      }
    });
};
