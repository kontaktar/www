import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  fetchUserExperiencesSuccess,
  fetchUserExperiencesFailure,
  createUserExperienceSuccess,
  createUserExperienceFailure,
  editUserExperienceSuccess,
  editUserExperienceFailure,
  deleteUserExperienceSuccess,
  deleteUserExperienceFailure
} from "store/actions";
import * as actionTypes from "store/actionTypes";
import {
  CreateExperience,
  EditExperience,
  DeleteExperience,
  GetExperiencesByUserId
} from "../../pages/api/endpoints";

function* fetchExperiencesByUserId(action) {
  try {
    const userExperiences = yield call(
      GetExperiencesByUserId,
      action.payload.userId
    );
    yield put(
      fetchUserExperiencesSuccess(action.payload.userId, userExperiences)
    );
  } catch (error) {
    yield put(fetchUserExperiencesFailure(error));
  }
}

function* createUserExperience(action) {
  try {
    const userExperience = yield call(
      CreateExperience,
      action.payload.userId,
      action.payload.experience
    );
    yield put(
      createUserExperienceSuccess(action.payload.userId, userExperience)
    );
  } catch (error) {
    yield put(createUserExperienceFailure(error));
  }
}

function* editUserExperience(action) {
  try {
    const userExperience = yield call(
      EditExperience,
      action.payload.userId,
      action.payload.experience
    );
    yield put(editUserExperienceSuccess(action.payload.userId, userExperience));
  } catch (error) {
    yield put(editUserExperienceFailure(error));
  }
}

function* deleteUserExperience(action) {
  try {
    yield call(
      DeleteExperience,
      action.payload.userId,
      action.payload.experienceId
    );
    yield put(
      deleteUserExperienceSuccess(
        action.payload.userId,
        action.payload.experienceId
      )
    );
  } catch (error) {
    yield put(deleteUserExperienceFailure(error));
  }
}

function* experiences() {
  yield all([
    takeEvery(
      actionTypes.FETCH_USER_EXPERIENCES_REQUEST,
      fetchExperiencesByUserId
    ),
    takeEvery(actionTypes.CREATE_USER_EXPERIENCE_REQUEST, createUserExperience),
    takeEvery(actionTypes.EDIT_USER_EXPERIENCE_REQUEST, editUserExperience),
    takeEvery(actionTypes.DELETE_USER_EXPERIENCE_REQUEST, deleteUserExperience)
  ]);
}

export default experiences;
