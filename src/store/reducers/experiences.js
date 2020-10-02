import * as actionType from "store/actionTypes";

function experiences(state = {}, action) {
  const filtered = (userId, experienceId) =>
    state.byUserId &&
    state.byUserId[userId] &&
    state.byUserId[userId].filter(experience => {
      return experience.id !== experienceId;
    });

  switch (action.type) {
    case actionType.FETCH_USER_EXPERIENCES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionType.FETCH_USER_EXPERIENCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        byUserId: {
          ...state.byUserId,
          [action.payload.userId]: [...action.payload.experiences]
        }
      };

    case actionType.FETCH_USER_EXPERIENCES_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };

    // CREATE
    case actionType.CREATE_USER_EXPERIENCE_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionType.CREATE_USER_EXPERIENCE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        byUserId: {
          ...state.byUserId, // keep other userIds in the store
          [action.payload.userId]: [
            ...(state.byUserId && state.byUserId[action.payload.userId] // keep previous experiences
              ? state.byUserId[action.payload.userId]
              : []),
            action.payload.experience
          ]
        }
      };

    case actionType.CREATE_USER_EXPERIENCE_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };
    // EDIT
    case actionType.EDIT_USER_EXPERIENCE_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionType.EDIT_USER_EXPERIENCE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        byUserId: {
          ...state.byUserId, // keep other userIds in the store
          [action.payload.userId]: [
            ...(filtered(action.payload.userId, action.payload.experience.id) ||
              []),
            action.payload.experience
          ]
        }
      };

    case actionType.EDIT_USER_EXPERIENCE_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };
    // BULK EDIT
    case actionType.EDIT_USER_EXPERIENCES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionType.EDIT_USER_EXPERIENCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        byUserId: {
          ...state.byUserId, // keep other userIds in the store
          [action.payload.userId]: action.payload.allExperiences
        }
      };

    case actionType.EDIT_USER_EXPERIENCES_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };
    // DELETE
    case actionType.DELETE_USER_EXPERIENCE_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionType.DELETE_USER_EXPERIENCE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        byUserId: {
          ...state.byUserId,
          [action.payload.userId]: [
            ...(filtered(action.payload.userId, action.payload.experienceId) ||
              [])
          ]
        }
      };

    case actionType.DELETE_USER_EXPERIENCE_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };

    default:
      return state;
  }
}

export default experiences;
