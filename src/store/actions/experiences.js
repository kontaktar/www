import * as actionType from "store/actionTypes";

export function fetchUserExperiences(userId) {
  return {
    type: actionType.FETCH_USER_EXPERIENCES_REQUEST,
    payload: {
      userId
    }
  };
}

export function fetchUserExperiencesSuccess(userId, experiences) {
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

export function createUserExperience(userId, experience) {
  return {
    type: actionType.CREATE_USER_EXPERIENCE_REQUEST,
    payload: {
      userId,
      experience
    }
  };
}
export function createUserExperienceSuccess(userId, experience) {
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

export function editUserExperience(userId, experience) {
  return {
    type: actionType.EDIT_USER_EXPERIENCE_REQUEST,
    payload: {
      experience,
      userId
    }
  };
}
export function editUserExperienceSuccess(userId, experience) {
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
export function editUserExperiences(userId, allExperiences) {
  return {
    type: actionType.EDIT_USER_EXPERIENCES_REQUEST,
    payload: {
      allExperiences,
      userId
    }
  };
}

export function editUserExperiencesSuccess(userId, allExperiences) {
  return {
    type: actionType.EDIT_USER_EXPERIENCES_SUCCESS,
    payload: {
      allExperiences,
      userId
    }
  };
}

export function editUserExperiencesFailure(message) {
  return {
    type: actionType.EDIT_USER_EXPERIENCES_FAILURE,
    message
  };
}

export function deleteUserExperience(userId, experienceId) {
  return {
    type: actionType.DELETE_USER_EXPERIENCE_REQUEST,
    payload: {
      experienceId,
      userId
    }
  };
}
export function deleteUserExperienceSuccess(userId, experienceId) {
  return {
    type: actionType.DELETE_USER_EXPERIENCE_SUCCESS,
    payload: {
      experienceId,
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
