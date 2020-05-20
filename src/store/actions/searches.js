import * as actionType from "store/actionTypes";

export function fetchSearchResult(input) {
  return {
    type: actionType.FETCH_SEARCH_RESULT_REQUEST,
    payload: {
      input
    }
  };
}

export function fetchSearchResultSuccess(input, results) {
  return {
    type: actionType.FETCH_SEARCH_RESULT_SUCCESS,
    payload: {
      input,
      results
    }
  };
}

export function fetchSearchResultFailure(message) {
  return {
    type: actionType.FETCH_SEARCH_RESULT_SUCCESS,
    message
  };
}
