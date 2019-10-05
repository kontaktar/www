import users from "../../../src/data/users-mock";

export default (request, response) => {
  response.status(200).json(users);
};
