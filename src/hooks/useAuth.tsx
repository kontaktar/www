/* eslint-disable no-param-reassign */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAuth as useFirebaseAuth } from "providers/FirebaseAuthUser";
import router from "next/router";
import useSWR from "swr";
import { Routes } from "types";
import { Endpoint, User, UserAddress, UserSessionStorage } from "types";
import {
  AddToSession,
  CreateUser,
  EditUser,
  UpdateUserLastLogin
} from "lib/endpoints";
import { debugError, time, timeEnd } from "helpers/debug";
import { post } from "helpers/methods";

import useLogger from "./useLogger";

type AuthContextProps = {
  user: UserSessionStorage;
  mutateUser: (data?: UserSessionStorage, shouldRevalidate?: boolean) => void;
  status: string;
  logout?: () => void;
  login?: (body: any) => void;
  register?: (userName: any) => void;
  editUser?: (userData: any) => void;
  preregister?: (user: any, token: any) => void;
};

const initialState = {
  user: { isLoggedIn: false },
  mutateUser: () => {},
  status: "INITIAL"
};

const AuthContext = React.createContext<AuthContextProps>(initialState);

type AuthReducerState = {
  status: string;
};

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
  const {
    signOut,
    firebaseIdToken,
    authUser: firebaseAuthUser
  } = useFirebaseAuth();
  const { data: user, error, mutate: mutateUser } = useSWR(Endpoint.User);

  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    setAuthUser(firebaseAuthUser);
    console.log("firebaseAuthUser", firebaseAuthUser);
  }, [firebaseAuthUser]);

  useEffect(() => {
    if (!user?.firebase?.token && firebaseAuthUser?.uid) {
      const updatedUser = {
        ...user,
        firebase: {
          token: firebaseIdToken,
          id: firebaseAuthUser?.uid
        }
      };
      async () => await AddToSession(updatedUser);
    }
  }, [user, firebaseIdToken]);

  const logout = useCallback(async () => {
    await post(Endpoint.Logout).then(() => {
      signOut();
      dispatch(setStatus("LOGGED_OUT"));
    });
    await mutateUser({ isLoggedIn: false }, true);
  }, [signOut, mutateUser]);

  const login = useCallback(
    async (userData) => {
      console.log("login:firebaseIdToken", firebaseIdToken);
      await post(Endpoint.Login, userData, { Authorization: firebaseIdToken });
      try {
        if (userData?.id) {
          await UpdateUserLastLogin({
            id: userData.id,
            firebaseToken: firebaseIdToken,
            lastLogin: new Date()
          });
        }
      } catch (error) {
        debugError(
          `useAuth:login_error: ${error} ${error.message}, ${error.code}`
        );
        router.push(Routes.Login);
      } finally {
        console.log("logging in user", userData);
        console.log("logging in user, user from session is", user);
        await mutateUser(
          { ...user, details: userData, isLoggedIn: true },
          true
        );
        router.push(Routes.Profile);
      }
    },
    [firebaseIdToken, mutateUser, user]
  );

  const preregister = useCallback(
    async (authUser, firebaseIdToken): Promise<void> => {
      console.log("preregister:firebaseIdToken", firebaseIdToken);
      const body = await post(Endpoint.Register, authUser, {
        Authorization: firebaseIdToken
      });
      mutateUser(body, true);
      router.push(Routes.Register);
    },
    [authUser, firebaseIdToken, mutateUser]
  );

  const register = useCallback(
    async (body: User): Promise<void> => {
      try {
        await CreateUser(body);
        dispatch(setStatus("REGISTERED"));
      } catch (error) {
        debugError("Register:Could not register user:", error.message);
      } finally {
        await mutateUser({ ...user, details: body, isLoggedIn: true }, true);
      }
    },
    [mutateUser, user]
  );

  const editUser = useCallback(
    async (userData: User & UserAddress): Promise<void> => {
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
    },
    [user, mutateUser, firebaseIdToken]
  );

  const contextValues = useMemo(
    () => ({
      ...state,
      editUser: (userData) => editUser(userData),
      logout: () => logout(),
      login: login,
      register: (userData) => register(userData),
      preregister: preregister,
      user: user,
      mutateUser: mutateUser
    }),
    [editUser, register, state, user, mutateUser, preregister, logout, login]
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
