import * as actionType from "store/actionTypes";

export function createUser(userInfo) {
  return {
    type: actionType.CREATE_USER_REQUEST,
    payload: {
      userInfo
    }
  };
}

export function createUserSuccess(userId) {
  return {
    type: actionType.CREATE_USER_SUCCESS,
    payload: {
      userId
    }
  };
}

export function createUserFailure(message) {
  return {
    type: actionType.CREATE_USER_FAILURE,
    message
  };
}
