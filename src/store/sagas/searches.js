import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSearchResultFailure,
  fetchSearchResultSuccess
} from "store/actions";
import * as actionTypes from "store/actionTypes";
import { GetSearchResult } from "../../pages/api/endpoints";

function* fetchSearchResult(action) {
  try {
    const result = yield call(GetSearchResult, action.payload.input);
    yield put(fetchSearchResultSuccess(action.payload.input, result));
  } catch (error) {
    yield put(fetchSearchResultFailure(error));
  }
}

function* experiences() {
  yield all([
    takeLatest(actionTypes.FETCH_SEARCH_RESULT_REQUEST, fetchSearchResult)
  ]);
}

export default experiences;
