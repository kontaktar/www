import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  fetchUserExperiencesSuccess,
  fetchUserExperiencesFailure
} from "store/actions";
import * as actionTypes from "store/actionTypes";
import { GetExperiencesByUserId } from "../../pages/api/endpoints";

function* fetchExperiencesByUserId(action) {
  try {
    const userExperiences = yield call(
      GetExperiencesByUserId,
      action.payload.userId
    );
    yield put(
      fetchUserExperiencesSuccess(userExperiences, action.payload.userId)
    );
  } catch (error) {
    yield put(fetchUserExperiencesFailure(error));
  }
}

function* experiences() {
  yield all([
    takeEvery(
      actionTypes.FETCH_USER_EXPERIENCES_REQUEST,
      fetchExperiencesByUserId
    )
  ]);
}

export default experiences;
