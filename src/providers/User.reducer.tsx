import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DatabaseUser } from "types";
import { GetUser } from "lib/endpoints";

export type UserContextType = {
  user: DatabaseUser;

  fetchUserById?: (f: string) => void;
};
export const userInitialState: UserContextType = {
  user: undefined as DatabaseUser
};

const User = createSlice({
  name: "UserProvider",
  initialState: userInitialState,
  reducers: {
    setCreatedUser: (
      state: UserContextType,
      action: { payload: DatabaseUser }
    ) => {
      state.user = action.payload;
    },
    setUpdatedUser: (
      state: UserContextType,
      action: { payload: DatabaseUser }
    ) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    },
    setUser: (state: UserContextType, action: { payload: DatabaseUser }) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    },
    // fetchUser: (state: UserContextType, action: { payload: User }) => {
    //   // api call here?
    //   state.user = {
    //     ...state.user,
    //     ...action.payload
    //   };
    // },
    fetchUserByUserName: (
      state: UserContextType,
      action: { payload: DatabaseUser }
    ) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    },
    fetchUserById: (
      state: UserContextType,
      action: { payload: DatabaseUser }
    ) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    }
  }
});

export const { setUser } = User.actions;
const UserReducer = User.reducer;
export default UserReducer;
