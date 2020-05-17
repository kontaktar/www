import * as ACTION_TYPES from "./actionTypes";

export const login = () => {
  return {
    type: ACTION_TYPES.LOGIN
  };
};

export const logout = () => {
  return {
    type: ACTION_TYPES.LOGOUT
  };
};

export const logoutFailure = () => {
  return {
    type: ACTION_TYPES.FAILURE
  };
};
