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
  // eslint-disable-next-line no-unused-vars
  const { password, ...restOfUserInfo } = userInfo; // removing password from store
  return {
    type: actionType.CREATE_USER_SUCCESS,
    payload: {
      userId,
      userInfo: restOfUserInfo
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
    type: actionType.FETCH_USER_REQUEST,
    payload: {
      userId
    }
  };
}

export function getUserSuccess(userInfo) {
  return {
    type: actionType.FETCH_USER_SUCCESS,
    payload: {
      userInfo
    }
  };
}

export function getUserFailure(message) {
  return {
    type: actionType.FETCH_USER_FAILURE,
    message
  };
}

export function getUserByUserName(userName) {
  return {
    type: actionType.FETCH_USER_BY_USER_NAME_REQUEST,
    payload: {
      userName
    }
  };
}

export function getUserByUserNameSuccess(userInfo) {
  return {
    type: actionType.FETCH_USER_BY_USER_NAME_SUCCESS,
    payload: {
      userInfo
    }
  };
}

export function getUserByUserNameFailure(message) {
  return {
    type: actionType.FETCH_USER_BY_USER_NAME_FAILURE,
    message
  };
}
