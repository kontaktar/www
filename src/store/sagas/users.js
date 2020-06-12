import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  createUserFailure,
  createUserSuccess,
  editUserSuccess,
  editUserFailure,
  getUserSuccess,
  getUserFailure,
  getUserByUserNameSuccess,
  getUserByUserNameFailure
} from "store/actions";
import * as actionTypes from "store/actionTypes";
import {
  CreateUser,
  EditUser,
  GetUser,
  GetUserByUserName
} from "../../pages/api/endpoints";

function* createUser(action) {
  try {
    const { userId } = yield call(CreateUser, action.payload.userInfo);
    yield put(createUserSuccess(userId, action.payload.userInfo));
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
    yield put(getUserFailure(error));
  }
}

function* getUserByUserName(action) {
  try {
    const result = yield call(GetUserByUserName, action.payload.userName);
    yield put(getUserByUserNameSuccess(result));
  } catch (error) {
    yield put(getUserByUserNameFailure(error));
  }
}

function* users() {
  yield all([
    takeEvery(actionTypes.CREATE_USER_REQUEST, createUser),
    takeEvery(actionTypes.EDIT_USER_REQUEST, editUser),
    takeEvery(actionTypes.FETCH_USER_REQUEST, getUser),
    takeEvery(actionTypes.FETCH_USER_BY_USER_NAME_REQUEST, getUserByUserName)
  ]);
}

export default users;
