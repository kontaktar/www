import Cors from "cors";
import { IronSession } from "types";
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

// eslint-disable-next-line import/prefer-default-export
export const withMiddleware = (request, response) => {
  runMiddleware(request, response, cors);
};

export const withUserAccess = (handler) => {
  return async (request, response) => {
    if (
      !request.session.get(IronSession.UserSession)?.details?.id ||
      request.session.get(IronSession.UserSession)?.details?.id.toString() !==
        request.query.id.toString()
    ) {
      debugError("witUserMiddleware: User does not have access");
      return response.status(401).json({ message: "Forbidden" });
    }
    return handler(request, response);
  };
};

export const hasUserAccess = (request, response) => {
  if (
    !request.session.get(IronSession.UserSession)?.details?.id ||
    request.session.get(IronSession.UserSession)?.details?.id.toString() !==
      request.query.id.toString()
  ) {
    debugError("witUserMiddleware: User does not have access");
    response.status(401).json({ message: "Forbidden" });
  }
};
