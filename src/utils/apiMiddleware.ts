import Cors from "cors";

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

export const withUserAccess = (request, response) => {
  if (
    request.session.get("user")?.id.toString() !== request.query.id.toString()
  ) {
    response.status(403).end("Forbidden");

    if (request.session.get("user") === undefined) {
      throw new Error(`User is not logged in`);
    } else {
      throw new Error(
        `User ${request.body.id} doesn't have access to ${
          request.session.get("user").id
        }`
      );
    }
  }
};
