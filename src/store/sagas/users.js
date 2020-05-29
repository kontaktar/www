import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  createUserFailure,
  createUserSuccess,
  editUserSuccess,
  editUserFailure,
  getUserSuccess,
  getUserFailure
} from "store/actions";
import * as actionTypes from "store/actionTypes";
import { CreateUser, EditUser, GetUser } from "../../pages/api/endpoints";

function* createUser(action) {
  try {
    const result = yield call(CreateUser, action.payload.userInfo);
    yield put(createUserSuccess(result, action.payload.userInfo));
  } catch (error) {
    yield put(createUserFailure(error));
  }
}

function* editUser(action) {
  try {
    yield call(EditUser, action.payload.userId, action.payload.userInfo);
    yield put(editUserSuccess(action.payload.userId, action.payload.userInfo));
  } catch (error) {
    yield put(editUserFailure(error));
  }
}

function* getUser(action) {
  try {
    const result = yield call(GetUser, action.payload.userId);
    yield put(getUserSuccess(result));
  } catch (error) {
    console.log("getUser", error);
    yield put(getUserFailure(error));
  }
}

function* users() {
  yield all([
    takeEvery(actionTypes.CREATE_USER_REQUEST, createUser),
    takeEvery(actionTypes.EDIT_USER_REQUEST, editUser),
    takeEvery(actionTypes.GET_USER_REQUEST, getUser)
  ]);
}

export default users;
