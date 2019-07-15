import users from "../../../data/users-mock";

export default ({ query: { id } }, response) => {
  const filtered = users.filter((p) => p.id.toString() === id.toString());

  // User with id exists
  if (filtered.length > 0) {
    response.status(200).json(filtered[0]);
  } else {
    response.status(404).json({ message: `User with id: ${id} not found.` });
  }
};
