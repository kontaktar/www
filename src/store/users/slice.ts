import { createSlice } from "@reduxjs/toolkit";

// const filtered = (state, userId, experienceId) =>
//   state.byUserId &&
//   state.byUserId[userId] &&
//   state.byUserId[userId].filter((experience) => {
//     return experience.id !== experienceId;
//   });

export const usersSlice = createSlice({
  name: "users",
  initialState: {} as any,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.user.id]: { ...action.payload.user }
        }
      };
    },
    setAuthorizedUser(state, action) {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.user.id]: { ...action.payload.user }
        },
        currentUser: { ...action.payload.user }
      };
    }
  }
});
