/* eslint-disable no-param-reassign */
import React, { createContext, useContext, useMemo, useReducer } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase";
import { Endpoint, User, UserAddress } from "types";
import { CreateUser, EditUser, UpdateUserLastLogin } from "lib/endpoints";
import useUser from "lib/useUser";
import { debugError, time, timeEnd } from "helpers/debug";
import { post } from "helpers/methods";

import useLogger from "./useLogger";

type AuthContextProps = {
  status: string;
  logout?: () => void;
  login?: (body: any, headers: any) => void;
  register?: (userName: any) => void;
  editUser?: (userData: any) => void;
};

type AuthReducerState = {
  status: string;
};

const initialState = {
  status: "INITIAL"
};
const AuthContext = createContext<AuthContextProps>(initialState);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state: AuthReducerState, action: PayloadAction<string>) => {
      state.status = action.payload;
    }
  }
});

export const { setStatus } = authSlice.actions;

const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider = ({
  children
}: {
  children: React.ReactChild;
}): React.ReactElement => {
  const [state, dispatch] = useReducer(
    useLogger(authSlice.reducer),
    initialState
  );
  const { user, mutateUser } = useUser();
  console.log("RENDERED: useAuth");

  const logout = async () => {
    await post(Endpoint.Logout).then(() => {
      firebase.auth().signOut();
      dispatch(setStatus("LOGGED_OUT"));
    });
    await mutateUser({ isLoggedIn: false }, true);
  };

  // TODO: I saw /api/login called twice on prod.
  // Make sure it's only called once.
  const login = async (body: User, token: string) => {
    await post(Endpoint.Login, body, { Authorization: token });
    try {
      await UpdateUserLastLogin({
        id: body.id,
        firebaseToken: token,
        lastLogin: new Date()
      });
    } catch (error) {
      debugError(`useAuth:login: ${error}`);
    } finally {
      await mutateUser({ ...user, details: body, isLoggedIn: true }, true);
    }
  };

  const register = async (body: User): Promise<void> => {
    try {
      await CreateUser(body);
      dispatch(setStatus("REGISTERED"));
    } catch (error) {
      debugError("Register:Could not register user:", error.message);
    } finally {
      await mutateUser({ ...user, details: body, isLoggedIn: true }, true);
    }
  };

  const editUser = async (userData: User & UserAddress): Promise<void> => {
    dispatch(setStatus("USER_EDIT_REQUEST"));

    time("useAuth:editUser: ");
    try {
      await EditUser(userData, user.firebase.token);
    } catch (error) {
      debugError("editUser:EditUser", error);
      dispatch(setStatus("USER_EDIT_FAILED"));
      return;
    }
    timeEnd("useAuth:editUser: ");

    time("useAuth:editUser:mutate: ");
    await mutateUser({ ...user, details: userData, isLoggedIn: true }, true);
    timeEnd("useAuth:editUser:mutate: ");

    dispatch(setStatus("USER_EDIT_SUCCESS"));
  };

  const contextValues = useMemo(
    () => ({
      ...state,
      editUser: (userData) => editUser(userData),
      logout: () => logout(),
      login: (userName, token) => login(userName, token),
      register: (userData) => register(userData)
    }),
    [editUser, register, state, user]
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
