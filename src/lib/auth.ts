import { TrainRounded } from "@material-ui/icons";
import * as admin from "firebase-admin";
import type { NextApiResponse } from "next";
import type { NextIronRequest } from "types";
import { IronSession, UserSessionStorage } from "types";
import { GetIsAdmin } from "lib/endpoints";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import { debugError } from "helpers/debug";

if (!admin.apps.length) {
  admin.initializeApp({
    ...firebaseAdminInitConfig,
    credential: admin.credential.cert({
      ...firebaseAdminInitConfig.credential
    })
  });
}

export const checkAuthHeader = async (
  request: NextIronRequest,
  response: NextApiResponse,
  session?: UserSessionStorage
) => {
  let userSession;
  if (!session) {
    userSession = request.session?.get(IronSession.UserSession);
  } else {
    userSession = session;
  }
  console.log(
    "request?.headers?.authorization",
    request?.headers?.authorization
  );
  if (request.headers && !request?.headers?.authorization) {
    response.status(401).json({ message: "Missing Authorization header" });
    throw new Error("Missing Authorization header");
  } else {
    return admin
      .auth()
      .verifyIdToken(request?.headers?.authorization)
      .then(async (decodedToken) => {
        console.log("-------TODO VERIFY-----");
        console.log("VERIFY FIREBASE USER!?");
        console.log("request.body.firebaseId", request.body.firebaseId);
        console.log("request.body.phoneNumber", request.body?.phoneNumer);
        console.log("decodedToken", decodedToken);
        console.log("decodedToken.phone_number", decodedToken?.phone_number);
        console.log("decodedToken.user_id", decodedToken?.user_id);
        console.log(
          "userSession?.user?.firebase?.id",
          userSession?.user?.firebase?.id
        );

        console.log(
          "userSession?.user?.firebase?.token",
          userSession?.user?.firebase?.token
        );
        // userSession.user.firebase.id getur verið annað en request?.headers.authorization ef notandi er adimin

        console.log(
          "should be true: usersessionToken === headers.authorisation ",
          userSession?.user?.firebase?.token === request?.headers?.authorization
        );
        console.log(
          "request?.headers?.authorization",
          request?.headers?.authorization
        );
        console.log("----------------------");
        // TODO: verify
      })
      .catch((error) => {
        debugError("checkAuthHeader:", error);
        if (error.code === "auth/id-token-expired") {
          request.session.destroy();
        } else if (error.code === "auth/user-not-found") {
          response.status(404).json({ message: "User not found." });
        }
        response.status(401).json({ message: "Forbidden" });
        throw new Error(
          "Forbidden, Authorization Header does not match Firebase user"
        );
      });
  }
};

export const isAuthorizedUser = async (request): Promise<boolean> => {
  const user: UserSessionStorage = request?.session?.get(
    IronSession.UserSession
  );
  const currentUserId = user?.details?.id?.toString();

  if (user?.isLoggedIn) {
    if (currentUserId) {
      return (
        request.body?.id?.toString() === currentUserId ||
        request.query?.id?.toString() === currentUserId
      );
    } else if (user.details?.phoneNumber) {
      return (
        request.body?.phoneNumber?.toString() ===
        user.details?.phoneNumber?.toString()
      );
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const isAdminOrAuthorizedUser = async (
  request,
  response
): Promise<boolean> => {
  const user: UserSessionStorage = request?.session?.get(
    IronSession.UserSession
  );

  if (!user) {
    debugError("isAdmin: No user or this is being called server side");
    return false;
  }

  try {
    await checkAuthHeader(request, response, user);
  } catch (error) {
    debugError("Could not match with Firebase user", error);
    throw new Error("Could not with Firebase user ");
    return false;
  }

  const hasAdminAccess = await GetIsAdmin(
    user?.details?.phoneNumber,
    user?.details?.id
  ).catch(() => debugError("User is not admin "));

  const isCurrentUser = await isAuthorizedUser(request);

  console.log("isCurrentUser", isCurrentUser);
  console.log("req.body", request.body);
  console.log("req.query", request.query);
  console.log("user", user);

  const isAdministrator =
    (user.details?.phoneNumber && hasAdminAccess) ?? false;

  if (!isAdministrator && !isCurrentUser) {
    debugError("isAdmin: User is not an admin or the current user");
    return false;
  }

  return true;
};
export const isCurrentUserUnregistered = async (
  request,
  response
): Promise<boolean> => {
  const user: UserSessionStorage = request?.session?.get(
    IronSession.UserSession
  );

  if (!user) {
    debugError("isAdmin: No user or this is being called server side");
    return false;
  }

  try {
    await checkAuthHeader(request, response, user);
  } catch (error) {
    debugError("Could not match with Firebase user");
    return false;
  }

  const hasAdminAccess = await GetIsAdmin(
    user?.details?.phoneNumber,
    user?.details?.id
  ).catch(() => debugError("User is not admin "));

  const isAdminOrAuthorizedUserUnregistered =
    request.body?.phoneNumber.toString() ===
    user.details?.phoneNumber.toString();

  const isAdministrator =
    (user.details?.phoneNumber && hasAdminAccess) ?? false;

  if (!isAdministrator && !isAdminOrAuthorizedUserUnregistered) {
    debugError("isAdmin: User is not an admin or the current user");
    return false;
  }

  return true;
};
