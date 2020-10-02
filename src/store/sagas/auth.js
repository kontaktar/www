import { all, call, put, takeEvery } from "redux-saga/effects";
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
  } catch (error) {
    yield put(getUserByUserNameFailure(error));
    yield put(loginFailure(error));
  }
}

function* loginCreatedUser(action) {
  yield loginUserByUserName({
    payload: {
      userName: action.payload.userInfo.userName
    }
  });
}

function* auth() {
  yield all([
    takeEvery(actionTypes.CREATE_USER_SUCCESS, loginCreatedUser),
    takeEvery(actionTypes.LOGIN_REQUEST, loginUserByUserName)
  ]);
}

export default auth;
