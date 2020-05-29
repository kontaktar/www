import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  fetchUserExperiencesSuccess,
  fetchUserExperiencesFailure
  // createUserExperienceSuccess,
  // createUserExperienceFailure
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

// function* createUserExperience(action) {
//   try {
//     const userExperience = yield call(
//       CreateUserExperience,
//       action.payload.userId
//     );
//     yield put(
//       createUserExperienceSuccess(userExperience, action.payload.userId)
//     );
//   } catch (error) {
//     yield put(createUserExperienceFailure(error));
//   }
// }

function* experiences() {
  yield all([
    takeEvery(
      actionTypes.FETCH_USER_EXPERIENCES_REQUEST,
      fetchExperiencesByUserId
    )
    // takeEvery(actionTypes.CREATE_USER_EXPERIENCE_REQUEST, createUserExperience),
    // takeEvery(actionTypes.EDIT_USER_EXPERIENCE_REQUEST, todo),
    // takeEvery(actionTypes.DELETE_USER_EXPERIENCE_REQUEST, todo)
  ]);
}

export default experiences;
