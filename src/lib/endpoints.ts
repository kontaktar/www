/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Endpoint, UserSessionStorage } from "types";
import { get, post, put, remove } from "helpers/methods";

export async function GetExperiencesByUserId(userId) {
  return get(`${Endpoint.Users}/${userId}/experiences`);
}

export async function GetSearchResult(input = "") {
  return input === ""
    ? get(Endpoint.Search)
    : get(`${Endpoint.Search}/${encodeURIComponent(input)}`);
}

export async function CreateUser(userInfo) {
  return post(Endpoint.Users, userInfo, {
    Authorization: userInfo.firebaseToken
  });
}
export async function UpdateUser(userInfo: UserSessionStorage) {
  return post(`${Endpoint.User}/update`, userInfo, {
    Authorization: userInfo.firebase.token
  });
}

export async function GetFireBaseId(uid: string) {
  return get(`${Endpoint.Users}?firebaseid=${uid}`);
}

export async function CreateExperience(userId, experience) {
  return post(`${Endpoint.Users}/${userId}/experiences`, experience);
}

// TODO: TEST
export async function DeleteUser(userId) {
  return remove(`${Endpoint.Users}/${userId}`);
}

export async function DeleteExperience(userId, experienceId) {
  return remove(`${Endpoint.Users}/${userId}/experiences/${experienceId}`);
}

export async function EditUser(userId, userInfo) {
  return put(`${Endpoint.Users}/${userId}`, userInfo);
}

export async function EditExperience(userId, experience) {
  return put(
    `${Endpoint.Users}/${userId}/experiences/${experience.id}`,
    experience
  );
}

export async function EditExperiences(userId, allExperiences) {
  return put(`${Endpoint.Users}/${userId}/experiences`, allExperiences);
}

export async function GetUser(userId) {
  return get(`${Endpoint.Users}/${userId}`);
}

export async function GetUserByUserName(userName) {
  if (userName) {
    return get(`${Endpoint.Users}?userName=${userName}`);
  }
  throw new Error("GetUserByUserName: No userName");
}

export async function GetUserByEmail(email) {
  return get(`${Endpoint.Users}?email=${email}`);
}

export async function GetUserByPhoneNumber(phoneNumber) {
  return get(`${Endpoint.Users}?phoneNumber=${phoneNumber}`);
}

export async function GetAllUsers() {
  return get(Endpoint.Users);
}
export async function GetAllUserNames() {
  return get(`${Endpoint.Users}/all-usernames`);
}
