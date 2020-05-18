import * as types from "../actionTypes";

export function fetchUserExperiences(userId) {
  return {
    type: types.FETCH_USER_EXPERIENCES_REQUEST,
    payload: {
      userId
    }
  };
}

export function fetchUserExperiencesSuccess(experiences) {
  return {
    type: types.FETCH_USER_EXPERIENCES_SUCCESS,
    payload: {
      experiences
    }
  };
}

export function fetchUserExperiencesFailure(message) {
  return {
    type: types.FETCH_USER_EXPERIENCES_SUCCESS,
    message
  };
}
