/* eslint-disable no-param-reassign */
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { User } from "types";
import { createUserSuccess } from "store/actions";
import useUser from "lib/useUser";
import { post } from "helpers/methods";
import {
  CreateFirebaseConnection,
  CreateUser,
  EditUser,
  GetUserByUserName
} from "../pages/api/endpoints";

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
    email: string,
    firebaseId: string,
    createdAt: string
  ) => void;
};

type AuthReducerState = {
  status: string;
  isLoggedIn: boolean;
  userData: any;
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
    // preRegisterUser: (state, action) => {
    //   // TODO: not used
    //   state.status = "PRE_REGISTER";
    //   state.userData.id = action.payload;
    // },
    updateAuthState: (state, action: PayloadAction<AuthReducerState>) => {
      state.status = action.payload.status;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userData = action.payload.userData;
    },
    addFirebaseConnection: (state, action) => {
      state.userData.id = action.payload.userId;
      state.userData.phoneNumber = action.payload.phoneNumber;
      state.userData.firebaseId = action.payload.firebaseId;
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
    await post("/api/logout").then(() => {
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
    await post("/api/login", body).then(async ({ isLoggedIn }) => {
      const result = await GetUserByUserName(body.userName);
      dispatch(
        updateAuthState({
          status: "LOGGED_IN",
          isLoggedIn,
          userData: result
        })
      );
    });
  };
  const loginFromSession = async (userName) => {
    const result = await GetUserByUserName(userName);
    dispatch(
      updateAuthState({
        status: "LOGGED_IN",
        isLoggedIn: true,
        userData: result
      })
    );
  };

  const connectFirebaseUser = async (phoneNumber, firebaseId, createdAt) => {
    try {
      const { userId } = await CreateUser({ phoneNumber, createdAt });
      console.log("userId created:", userId);
      await CreateFirebaseConnection({ id: userId, firebaseId });
      dispatch(
        addFirebaseConnection({
          userId,
          phoneNumber,
          firebaseId
        })
      );
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const register = async (body) => {
    // TODO: Instead of doing two API calls here, do one to register
    // that also createsUser and handle the rerouting after reguster here.
    await EditUser(body.id, body).then(async (result) => {
      console.log("result", result);
      await post("/api/register", body.userName);
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
  };

  const editUser = async (userData) => {
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
        register: (userName) => register(userName),
        connectFirebaseUser: (email, firebaseId, createdAt) =>
          connectFirebaseUser(email, firebaseId, createdAt)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
