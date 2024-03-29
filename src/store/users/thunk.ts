import { Experiences, UserSessionStorage } from "types";
import { EditUser, GetUser, GetUserByUserName } from "lib/endpoints";
import { AppThunk } from "../configureStore";

import { usersSlice } from "./slice";

export const fetchUserByUserName =
  (userName: string): AppThunk =>
  async (dispatch) => {
    const user = await GetUserByUserName(userName);
    dispatch(usersSlice.actions.setUser({ user: user }));
  };

export const fetchUserById =
  (userId: number): AppThunk =>
  async (dispatch) => {
    const user = await GetUser(userId);
    dispatch(usersSlice.actions.setUser({ user: user }));
  };
export const fetchAuthorizedUser =
  (userId: number): AppThunk =>
  async (dispatch) => {
    const user = await GetUser(userId);
    dispatch(usersSlice.actions.setAuthorizedUser({ user: user }));
  };
