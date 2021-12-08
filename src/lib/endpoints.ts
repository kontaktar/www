import { Endpoint, UserSessionStorage } from "types";
import { get, post, put, remove } from "helpers/methods";

export async function GetExperiencesByUserId(userId) {
  return get(`${Endpoint.User}/${userId}/experiences`);
}

export async function GetSearchResult(input = "") {
  return input === ""
    ? get(Endpoint.Search)
    : get(`${Endpoint.Search}/${encodeURIComponent(input)}`);
}

export async function CreateUser(userInfo) {
  return post(Endpoint.User, userInfo, {
    Authorization: userInfo.firebaseToken
  });
}
export async function AddToSession(userInfo: UserSessionStorage) {
  return post(`${Endpoint.User}/session`, userInfo, {
    Authorization: userInfo.firebase.token
  });
}

// export async function GetFireBaseId(uid: string) {
//   return get(`${Endpoint.Users}?firebaseid=${uid}`);
// }

export async function CreateExperience(userId, experience, firebaseToken) {
  return post(`${Endpoint.User}/${userId}/experiences`, experience, {
    Authorization: firebaseToken
  });
}

export async function DeleteUser(userId, firebaseToken) {
  return remove(`${Endpoint.User}/${userId}`, "", {
    Authorization: firebaseToken
  });
}

export async function DeleteExperience(userId, experienceId, firebaseToken) {
  return remove(`${Endpoint.User}/${userId}/experiences/${experienceId}`, "", {
    Authorization: firebaseToken
  });
}

export async function EditUser(userInfo, firebaseToken) {
  return put(`${Endpoint.User}/${userInfo.id}`, userInfo, {
    Authorization: firebaseToken
  });
}

export async function UpdateUserLastLogin(userInfo) {
  return put(`${Endpoint.User}/${userInfo.id}/lastLogin`, userInfo, {
    Authorization: userInfo.firebaseToken
  });
}

export async function EditExperience(user, experience, firebaseToken) {
  return put(
    `${Endpoint.User}/${user.details.id}/experiences/${experience.id}`,
    experience,
    {
      Authorization: firebaseToken
    }
  );
}

// Use for draggable container, only updates sort.
export async function EditExperiences(userId, allExperiences, firebaseToken) {
  return put(`${Endpoint.User}/${userId}/experiences`, allExperiences, {
    Authorization: firebaseToken
  });
}

export async function GetUser(userId) {
  return get(`${Endpoint.User}/${userId}`);
}

export async function GetUserByUserName(userName) {
  if (userName) {
    return get(`${Endpoint.User}?userName=${userName}`);
  }
  throw new Error("GetUserByUserName: No userName");
}

// export async function GetUserByEmail(email) {
//   return get(`${Endpoint.Users}?email=${email}`);
// }

export async function GetUserByPhoneNumber(phoneNumber) {
  return get(`${Endpoint.User}?phoneNumber=${phoneNumber}`);
}

// export async function GetAllUsers() {
//   return get(Endpoint.Users);
// }
export async function GetAllUserNames() {
  return get(`${Endpoint.Users}`);
}

export async function GetIsAdmin(phoneNumber: string, id: number) {
  if (!!phoneNumber && !!id) {
    return (
      get(
        `${Endpoint.Admins}?phoneNumber=${encodeURIComponent(
          phoneNumber
        )}&id=${id}`
      ) ?? false
    );
  }
}
