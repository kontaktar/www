import * as actionType from "store/actionTypes";

export function fetchUserExperiences(userId) {
  return {
    type: actionType.FETCH_USER_EXPERIENCES_REQUEST,
    payload: {
      userId
    }
  };
}

export function fetchUserExperiencesSuccess(experiences, userId) {
  return {
    type: actionType.FETCH_USER_EXPERIENCES_SUCCESS,
    payload: {
      experiences,
      userId
    }
  };
}

export function fetchUserExperiencesFailure(message) {
  return {
    type: actionType.FETCH_USER_EXPERIENCES_FAILURE,
    message
  };
}

export function createUserExperience(userId) {
  return {
    type: actionType.CREATE_USER_EXPERIENCE_REQUEST,
    payload: {
      userId
    }
  };
}
export function createUserExperienceSuccess(experience, userId) {
  return {
    type: actionType.CREATE_USER_EXPERIENCE_SUCCESS,
    payload: {
      experience,
      userId
    }
  };
}
export function createUserExperienceFailure(message) {
  return {
    type: actionType.CREATE_USER_EXPERIENCE_FAILURE,
    message
  };
}

export function editUserExperience(experienceId, userId) {
  return {
    type: actionType.EDIT_USER_EXPERIENCE_REQUEST,
    payload: {
      experienceId,
      userId
    }
  };
}
export function editUserExperienceSuccess(experience, userId) {
  return {
    type: actionType.EDIT_USER_EXPERIENCE_SUCCESS,
    payload: {
      experience,
      userId
    }
  };
}
export function editUserExperienceFailure(message) {
  return {
    type: actionType.EDIT_USER_EXPERIENCE_FAILURE,
    message
  };
}

export function deleteUserExperience(experienceId, userId) {
  return {
    type: actionType.DELETE_USER_EXPERIENCE_REQUEST,
    payload: {
      experienceId,
      userId
    }
  };
}
export function deleteUserExperienceSuccess(experience, userId) {
  return {
    type: actionType.DELETE_USER_EXPERIENCE_SUCCESS,
    payload: {
      experience,
      userId
    }
  };
}
export function deleteUserExperienceFailure(message) {
  return {
    type: actionType.DELETE_USER_EXPERIENCE_FAILURE,
    message
  };
}
