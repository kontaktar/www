import { get, post, put, remove } from "helpers/methods";

export async function GetExperiencesByUserId(userId) {
  return get(`/api/users/${userId}/experiences`);
}

// TODO: TEST - probably won't need this.
export async function GetExperienceByUserId(userId, experienceId) {
  return get(`/api/users/${userId}/experiences/${experienceId}`);
}

export async function GetSearchResult(input = "") {
  return get(`/api/search/${input}`);
}

export async function CreateUser(userInfo) {
  return post("/api/users", userInfo);
}

export async function CreateExperience(userId, experience) {
  return post(`/api/users/${userId}/experiences`, experience);
}

// TODO: TEST
export async function DeleteUser(userId) {
  return remove(`/api/users/${userId}`);
}

export async function DeleteExperience(userId, experienceId) {
  return remove(`/api/users/${userId}/experiences/${experienceId}`);
}

export async function EditUser(userId, userInfo) {
  return put(`/api/users/${userId}`, userInfo);
}

export async function EditExperience(userId, experience) {
  return put(`/api/users/${userId}/experiences/${experience.id}`, experience);
}

export async function GetUser(userId) {
  return get(`/api/users/${userId}`);
}

export async function GetAllUsers() {
  return get(`/api/users`);
}
