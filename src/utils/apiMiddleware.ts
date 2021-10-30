import Cors from "cors";
import { IronSession, UserSessionStorage } from "types";
import { GetIsAdmin } from "lib/endpoints";
import withSession from "lib/sessions";
import { debugError } from "helpers/debug";

const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "HEAD"]
});

function runMiddleware(request, response, fn) {
  return new Promise((resolve, reject) => {
    fn(request, response, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const withMiddleware = async (req, res) => {
  await runMiddleware(req, res, cors);
};

export const withUserAccess = () => {
  return async (request, response) => {
    if (
      !request.session.get(IronSession.UserSession)?.details?.id ||
      request.session.get(IronSession.UserSession)?.details?.id.toString() !==
        request.query.id.toString()
    ) {
      debugError("witUserMiddleware: User does not have access");
      response.status(401).json({ message: "Forbidden" });
    }
  };
};
export const hasUserAccess = async (request, response): Promise<boolean> => {
  if (
    !request.session.get(IronSession.UserSession)?.details?.id ||
    request.session.get(IronSession.UserSession)?.details?.id.toString() !==
      request.query.id.toString()
  ) {
    debugError("hasUserAccess: User does not have access");
    response.status(401).json({ message: "Forbidden" });
    return false;
  }
  return true;
};

export const isAdminOrCurrentUser = async (request): Promise<boolean> => {
  const user: UserSessionStorage = request?.session?.get(
    IronSession.UserSession
  );

  if (!user) {
    debugError("isAdmin: No user or this is being called server side");
    return false;
  }

  const hasAdminAccess = await GetIsAdmin(
    user?.details?.phoneNumber,
    user?.details?.id
  ).catch(() => debugError("User is not admin "));

  const isCurrentUser =
    request?.body?.id?.toString() === user?.details?.id?.toString() ||
    request?.query?.id?.toString() === user?.details?.id?.toString();

  const isAdministrator =
    (user?.details?.phoneNumber && hasAdminAccess) ?? false;
  if (!(user?.isLoggedIn && (isAdministrator || isCurrentUser))) {
    debugError("isAdmin: User is not an admin or the current user");
    return false;
  }
  return true;
};
