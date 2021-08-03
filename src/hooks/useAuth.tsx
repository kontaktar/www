/* eslint-disable no-param-reassign */
import React, { createContext, useContext, useMemo, useReducer } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase";
import { Endpoint, User, UserAddress } from "types";
import { EditUser } from "lib/endpoints";
import useUser from "lib/useUser";
import { debugError, time, timeEnd } from "helpers/debug";
import { post } from "helpers/methods";

import useLogger from "./useLogger";

// TODO: probably just remove the whole usereducer, not using the isLoggedIn

type AuthContextProps = {
  status: string;
  isLoggedIn: boolean;
  logout?: () => void;
  login?: (body: any, headers: any) => void;
  register?: (userName: any) => void;
  editUser?: (userData: any) => void;
};

type AuthReducerState = {
  status: string;
  isLoggedIn: boolean;
};

const initialState = {
  status: "INITIAL",
  isLoggedIn: false
};
const AuthContext = createContext<AuthContextProps>(initialState);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state: AuthReducerState, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setStatus: (state: AuthReducerState, action: PayloadAction<string>) => {
      state.status = action.payload;
    }
  }
});

export const { setLoggedIn, setStatus } = authSlice.actions;

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

  const logout = async () => {
    await post(Endpoint.Logout).then(() => {
      firebase.auth().signOut();
      dispatch(setLoggedIn(false));
      dispatch(setStatus("LOGGED_OUT"));
    });
    await mutateUser({ isLoggedIn: false }, true);
  };

  // TODO: I saw /api/login called twice on prod.
  // Make sure it's only called once.
  const login = async (body: User, token: string) => {
    await post(Endpoint.Login, body, { Authorization: token }).then(
      async ({ isLoggedIn }) => {
        dispatch(setLoggedIn(isLoggedIn));
      }
    );
    try {
      await EditUser(body.id, { lastLogin: new Date() });
    } catch (error) {
      debugError(`useAuth:login: ${error}`);
    } finally {
      await mutateUser({ details: body, isLoggedIn: true }, true);
    }
  };

  const register = async (body: User): Promise<void> => {
    try {
      // TODO: create /register endpoint instead
      await EditUser(body.id, body);
      dispatch(setStatus("REGISTERED"));
      dispatch(setLoggedIn(true));
      await mutateUser({ details: body, isLoggedIn: true }, true);
    } catch (error) {
      debugError("Register:Could not register user:", error.message);
      debugError(`Register:Could not register user: ${error}`);
    }
  };

  const editUser = async (userData: User & UserAddress): Promise<void> => {
    dispatch(setStatus("USER_EDIT_REQUEST"));

    time("useAuth:editUser: ");
    await EditUser(userData.id, userData);
    timeEnd("useAuth:editUser: ");

    time("useAuth:editUser:mutate: ");
    await mutateUser({ details: userData, isLoggedIn: true }, true);
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
