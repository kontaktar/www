/* eslint-disable no-param-reassign */
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Endpoint, User, UserAddress } from "types";
import { createUserSuccess } from "store/actions";
import {
  CreateFirebaseConnection,
  EditUser,
  GetUserByUserName
} from "lib/endpoints";
import useUser from "lib/useUser";
import { debug, debugError } from "helpers/debug";
import { post } from "helpers/methods";

import useLogger from "./useLogger";

type AuthContextProps = {
  status: string;
  isLoggedIn: boolean;
  userData: any;
  logout?: () => void;
  login?: (body: any) => void;
  register?: (userName: any) => void;
  editUser?: (userData: any) => void;
  connectFirebaseUser?: (
    userId: number,
    phoneNumber: string,
    firebaseId: string
  ) => void;
};

type UserData = {
  id: number;
  phoneNumber: string;
  firebaseId?: string;
};

type AuthReducerState = {
  status: string;
  isLoggedIn: boolean;
  userData: UserData | undefined;
};

const initialState = {
  status: "INITIAL",
  isLoggedIn: false,
  userData: undefined
};
const AuthContext = createContext<AuthContextProps>(initialState);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, action: PayloadAction<AuthReducerState>) => {
      state.status = action.payload.status;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userData = {
        ...state.userData,
        ...action.payload.userData
      };
    },
    addFirebaseConnection: (state, action) => {
      state.status = "ADDED_FIREBASE_CONNECTION";

      state.userData = {
        id: action.payload.userId,
        phoneNumber: action.payload.phoneNumber,
        firebaseId: action.payload.firebaseId
      };
    }
  }
});

export const { addFirebaseConnection, updateAuthState } = authSlice.actions;

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
  const { user } = useUser();

  const dispatchToStore = useDispatch();

  const logout = async () => {
    await post(Endpoint.Logout).then(() => {
      dispatch(
        updateAuthState({
          status: "LOGGED_OUT",
          isLoggedIn: false,
          userData: undefined
        })
      );
    });
  };

  const login = async (body: User) => {
    await post(Endpoint.Login, body).then(async ({ isLoggedIn }) => {
      const result = await GetUserByUserName(body.userName);

      dispatch(
        updateAuthState({
          status: "LOGGED_IN",
          isLoggedIn,
          userData: result
        })
      );
    });
    try {
      await EditUser(body.id, { lastLogin: new Date() });
    } catch (error) {
      debugError(`useAuth:login: ${error}`);
    }
  };
  const loginFromSession = async (userName) => {
    try {
      const result = await GetUserByUserName(userName);
      dispatch(
        updateAuthState({
          status: "LOGGED_IN",
          isLoggedIn: true,
          userData: result
        })
      );
    } catch (error) {
      dispatch(
        updateAuthState({
          status: "LOGGED_OUT",
          isLoggedIn: false,
          userData: undefined
        })
      );
    }
  };

  const connectFirebaseUser = async (
    userId,
    phoneNumber,
    firebaseId
  ): Promise<void> => {
    try {
      await CreateFirebaseConnection({ id: userId, firebaseId });
      debug(`Connecting ${userId} to ${firebaseId}`);
      dispatch(
        addFirebaseConnection({
          userId,
          phoneNumber,
          firebaseId
        })
      );
    } catch (error) {
      debugError(`useAuth:connectFirebaseUser: ${error}`);
    }
  };

  const register = async (body: User): Promise<void> => {
    try {
      await EditUser(body.id, body).then(async (result) => {
        dispatchToStore(createUserSuccess(result.userId, body));
        dispatch(
          updateAuthState({
            status: "LOGGED_IN",
            isLoggedIn: true,
            userData: {
              id: result.userId,
              ...body
            }
          })
        );
      });
    } catch (error) {
      debugError(`Could not register user: ${error}`);
    }
  };

  const editUser = async (userData: User & UserAddress): Promise<void> => {
    await EditUser(userData.id, userData);
    dispatch(
      updateAuthState({
        status: "LOGGED_IN",
        isLoggedIn: true,
        userData
      })
    );
  };
  useEffect(() => {
    // login from session-storage
    if (user && user?.isLoggedIn !== state?.isLoggedIn) {
      if (user.isLoggedIn === true && state?.status !== "LOGGED_OUT") {
        loginFromSession(user.login);
      }
    }
  }, [state?.isLoggedIn, state?.status, user]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        editUser: (userData) => editUser(userData),
        logout: () => logout(),
        login: (userName) => login(userName),
        register: (userData) => register(userData),
        connectFirebaseUser: (userId, email, firebaseId) =>
          connectFirebaseUser(userId, email, firebaseId)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
