import * as actionType from "store/actionTypes";

// TODO:
// DeleteUser

export function createUser(userInfo) {
  return {
    type: actionType.CREATE_USER_REQUEST,
    payload: {
      userInfo
    }
  };
}

export function createUserSuccess(userId, userInfo) {
  return {
    type: actionType.CREATE_USER_SUCCESS,
    payload: {
      userId,
      userInfo
    }
  };
}

export function createUserFailure(message) {
  return {
    type: actionType.CREATE_USER_FAILURE,
    message
  };
}

export function editUser(userId, userInfo) {
  return {
    type: actionType.EDIT_USER_REQUEST,
    payload: {
      userId,
      userInfo
    }
  };
}

export function editUserSuccess(userId, userInfo) {
  return {
    type: actionType.EDIT_USER_SUCCESS,
    payload: {
      userId,
      userInfo
    }
  };
}

export function editUserFailure(message) {
  return {
    type: actionType.EDIT_USER_FAILURE,
    message
  };
}

export function getUser(userId) {
  return {
    type: actionType.GET_USER_REQUEST,
    payload: {
      userId
    }
  };
}

export function getUserSuccess(userInfo) {
  return {
    type: actionType.GET_USER_SUCCESS,
    payload: {
      userInfo
    }
  };
}

export function getUserFailure(message) {
  return {
    type: actionType.GET_USER_FAILURE,
    message
  };
}
