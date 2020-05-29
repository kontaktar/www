import * as actionType from "store/actionTypes";

function experiences(state = {}, action) {
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
          [action.payload.userId]: { ...action.payload.experiences }
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
          ...state.byUserId,
          // TODO: check if experience is added to an object if it's there in prev state
          [action.payload.userId]: { ...action.payload.experience }
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
          ...state.byUserId,
          // TODO: check if experience is updated in the object
          [action.payload.userId]: { ...action.payload.experiences }
        }
      };

    case actionType.EDIT_USER_EXPERIENCE_FAILURE:
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
          // TODO: check if experience has been removed
          [action.payload.userId]: { ...action.payload.experiences }
        }
      };

    case actionType.DELETE_USER_EXPERIENCE_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };

    default:
      return { ...state };
  }
}

export default experiences;
