import * as actionType from "store/actionTypes";

export function login(userName, password) {
  return {
    type: actionType.LOGIN_REQUEST,
    payload: {
      userName,
      password
    }
  };
}

export function loginSuccess(userInfo) {
  return {
    type: actionType.LOGIN_SUCCESS,
    payload: {
      userInfo
    }
  };
}

export function loginFailure(message) {
  return {
    type: actionType.LOGIN_FAILURE,
    message
  };
}
