import { get, post, put } from "helpers/methods";

export async function GetExperiencesByUserId(userId) {
  return get(`/api/users/${userId}/experiences`);
}

export async function GetSearchResult(input = "") {
  return get(`/api/search/${input}`);
}

export async function CreateUser(userInfo) {
  return post("/api/users", userInfo);
}

export async function EditUser(userId, userInfo) {
  return put(`/api/users/${userId}`, userInfo);
}

export async function GetUser(userId) {
  return get(`/api/users/${userId}`);
}
