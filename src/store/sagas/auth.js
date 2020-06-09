import { all, call, put, takeEvery } from "redux-saga/effects";
import { login } from "utils/auth";
import {
  getUserByUserNameSuccess,
  getUserByUserNameFailure
} from "store/actions";
import * as actionTypes from "store/actionTypes";
import { GetUserByUserName } from "../../pages/api/endpoints";

function* getUserByUserName(action) {
  try {
    const result = yield call(GetUserByUserName, action.payload.userName);
    yield put(getUserByUserNameSuccess(result));
    yield login({ username: action.payload.userName });
  } catch (error) {
    yield put(getUserByUserNameFailure(error));
  }
}

function* auth() {
  yield all([
    takeEvery(actionTypes.FETCH_USER_BY_USER_NAME_REQUEST, getUserByUserName)
  ]);
}

export default auth;
