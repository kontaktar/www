import { all, call, put, takeLatest } from "redux-saga/effects";
import { createUserFailure, createUserSuccess } from "store/actions";
import * as actionTypes from "store/actionTypes";
import { CreateUser } from "../../pages/api/endpoints";

function* createUser(action) {
  try {
    const result = yield call(CreateUser, action.payload.userInfo);
    yield put(createUserSuccess(result));
  } catch (error) {
    yield put(createUserFailure(error));
  }
}

function* users() {
  yield all([takeLatest(actionTypes.CREATE_USER_REQUEST, createUser)]);
}

export default users;
