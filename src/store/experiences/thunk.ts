import { Experiences, UserSessionStorage } from "types";
import {
  CreateExperience,
  DeleteExperience,
  EditExperience,
  GetExperiencesByUserId
} from "lib/endpoints";
import { AppThunk } from "../configureStore";

import { experiencesSlice } from "./slice";

export const fetchUserExperiences =
  (userId: number): AppThunk =>
  async (dispatch) => {
    const experiences = await GetExperiencesByUserId(userId);
    dispatch(
      experiencesSlice.actions.setExperiencesByUserId({
        userId: userId,
        experiences: experiences
      })
    );
  };

export const createUserExperience =
  (user: UserSessionStorage, experience: Experiences): AppThunk =>
  async (dispatch) => {
    console.log("user creating exp", user);
    await CreateExperience(user.details.id, experience, user.firebase.token);
    dispatch(
      experiencesSlice.actions.setNewUserExperience({
        userId: user.details.id,
        experience: experience
      })
    );
  };

export const editUserExperience =
  (user: UserSessionStorage, experience: Experiences): AppThunk =>
  async (dispatch) => {
    await EditExperience(user, experience, user.firebase.token);
    dispatch(
      experiencesSlice.actions.setUserExperience({
        userId: user.details.id,
        experience: experience
      })
    );
  };

export const deleteUserExperience =
  (user: UserSessionStorage, experienceId: string): AppThunk =>
  async (dispatch) => {
    await DeleteExperience(user, experienceId, user.firebase.token);
    dispatch(
      experiencesSlice.actions.removeUserExperience({
        userId: user.details.id,
        experienceId: experienceId
      })
    );
  };
