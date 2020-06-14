import { all, call, put, takeEvery } from "redux-saga/effects";
import { login } from "utils/auth";
import {
  getUserByUserNameSuccess,
  getUserByUserNameFailure,
  loginSuccess,
  loginFailure
} from "store/actions";
import * as actionTypes from "store/actionTypes";
import { GetUserByUserName } from "../../pages/api/endpoints";

function* loginUserByUserName(action) {
  try {
    const result = yield call(GetUserByUserName, action.payload.userName);
    yield put(getUserByUserNameSuccess(result));
    yield put(loginSuccess(result));
    yield login({ username: action.payload.userName });
  } catch (error) {
    yield put(getUserByUserNameFailure(error));
    yield put(loginFailure(error));
  }
}

function* auth() {
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginUserByUserName)]);
}

export default auth;
