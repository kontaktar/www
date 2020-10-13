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
  if (request.session.get("user")?.id !== request.query.id) {
    response.status(403).end("Forbidden");

    // TODO: Hide on production
    throw new Error(
      `User ${request.body.id} doesn't have access to ${
        request.session.get("user").id
      }`
    );
  }
};
