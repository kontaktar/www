import { createSlice } from "@reduxjs/toolkit";

const filtered = (state, userId, experienceId) =>
  state.byUserId &&
  state.byUserId[userId] &&
  state.byUserId[userId].filter((experience) => {
    return experience.id !== experienceId;
  });

export const experiencesSlice = createSlice({
  name: "experiences",
  initialState: {} as any,
  reducers: {
    setExperiencesByUserId(state, action) {
      return {
        byUserId: {
          ...state.byUserId,
          [action.payload.userId]: [...action.payload.experiences]
        }
      };
    },
    setNewUserExperience(state, action) {
      return {
        byUserId: {
          ...state.byUserId, // keep other userIds in the store
          [action.payload.userId]: [
            ...(state.byUserId && state.byUserId[action.payload.userId] // keep previous experiences
              ? state.byUserId[action.payload.userId]
              : []),
            action.payload.experience
          ]
        }
      };
    },
    setUserExperience(state, action) {
      return {
        byUserId: {
          ...state.byUserId, // keep other userIds in the store
          [action.payload.userId]: [
            ...(filtered(
              state,
              action.payload.userId,
              action.payload.experience.id
            ) || []),
            action.payload.experience
          ]
        }
      };
    },
    removeUserExperience(state, action) {
      return {
        byUserId: {
          ...state.byUserId,
          [action.payload.userId]: [
            ...(filtered(
              state,
              action.payload.userId,
              action.payload.experienceId
            ) || [])
          ]
        }
      };
    }
  }
});
