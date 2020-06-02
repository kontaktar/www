import * as actionType from "store/actionTypes";

function searches(state = {}, action) {
  switch (action.type) {
    case actionType.FETCH_SEARCH_RESULT_REQUEST:
      return {
        ...state,
        isFetching: true,
        latestInput: action.payload.input
      };

    case actionType.FETCH_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        [action.payload.input]: { ...action.payload.results }
      };

    case actionType.FETCH_SEARCH_RESULT_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };

    case actionType.UPDATE_LATEST_SEARCH:
      return {
        ...state,
        latestInput: action.payload.input
      };
    default:
      return { ...state };
  }
}

export default searches;
