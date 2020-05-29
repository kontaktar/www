import { get, post, put } from "helpers/methods";

export async function GetExperiencesByUserId(userId) {
  return get(`/api/users/${userId}/experiences`);
}

// TODO: TEST
export async function GetExperienceByUserId(userId, experienceId) {
  return get(`/api/users/${userId}/experiences/${experienceId}`);
}

export async function GetSearchResult(input = "") {
  return get(`/api/search/${input}`);
}

export async function CreateUser(userInfo) {
  return post("/api/users", userInfo);
}

// TODO: TEST
export async function CreateExperience(userId, experience) {
  return post(`/api/users/${userId}`, experience);
}

// export async function DeleteUser(userId) {
//   return delete(`/api/users/${userId}`);
// }

// export async function DeleteExperience(userId, experienceId) {
//   return delete(`/api/users/${userId/experiences/${experienceId}}`);
// }

// TODO: TEST
export async function EditUser(userId, userInfo) {
  return put(`/api/users/${userId}`, userInfo);
}

// TODO: TEST
export async function EditExperience(userId, experience) {
  return put(`/api/users/${userId}/experiences/${experience.id}`, experience);
}

export async function GetUser(userId) {
  return get(`/api/users/${userId}`);
}

// TODO: TEST
export async function GetAllUsers() {
  return get(`/api/users`);
}
