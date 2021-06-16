import { get, post, put, remove } from "helpers/methods";

// TODO: move this file, shouldn't be here

export async function GetExperiencesByUserId(userId) {
  return get(`/api/users/${userId}/experiences`);
}

export async function GetSearchResult(input = "") {
  return input === ""
    ? get(`/api/search`)
    : get(`/api/search/${encodeURIComponent(input)}`);
}

export async function CreateUser(userInfo) {
  return post("/api/users", userInfo);
}

export async function CreateFirebaseConnection(userIds) {
  return post("/api/users", userIds);
}

export async function GetFireBaseId(uid) {
  return get(`/api/users?firebaseid=${uid}`);
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

export async function EditExperiences(userId, allExperiences) {
  return put(`/api/users/${userId}/experiences`, allExperiences);
}

export async function GetUser(userId) {
  return get(`/api/users/${userId}`);
}

export async function GetUserByUserName(userName) {
  return get(`/api/users?userName=${userName}`);
}

export async function GetUserByEmail(email) {
  return get(`/api/users?email=${email}`);
}

export async function GetUserByPhoneNumber(phoneNumber) {
  return get(`/api/users?phoneNumber=${phoneNumber}`);
}

export async function GetAllUsers() {
  return get(`/api/users`);
}
export async function GetAllUserNames() {
  return get(`/api/users/all-usernames`);
}
