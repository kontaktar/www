import { get, post } from "helpers/methods";

export async function GetExperiencesByUserId(userId = "2") {
  return get(`/api/users/${userId}/experiences`);
}

export async function GetSearchResult(input = "") {
  return get(`/api/search/${input}`);
}

export async function CreateUser(userInfo) {
  return post("/api/users", userInfo);
}
