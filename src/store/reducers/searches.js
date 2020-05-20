import * as actionType from "store/actionTypes";

function searches(state = {}, action) {
  switch (action.type) {
    case actionType.FETCH_SEARCH_RESULT_REQUEST:
      return {
        ...state,
        latestInput: action.payload.input
      };

    case actionType.FETCH_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        [action.payload.input]: { ...action.payload.results }
      };

    case actionType.FETCH_SEARCH_RESULT_FAILURE:
      return {
        ...state,
        ...{ error: action.message }
      };

    default:
      return { ...state };
  }
}

export default searches;
