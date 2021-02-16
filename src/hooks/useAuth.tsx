import React, { createContext, useContext, useEffect, useReducer } from "react";
import useUser from "lib/useUser";
import { get, post } from "helpers/methods";
import { EditUser, GetUserByUserName } from "../pages/api/endpoints";

import useLogger from "./useLogger";

type AuthContextProps = {
  status: string;
  isLoggedIn: boolean;
  userData: any;
  logout?: () => void;
  login?: (body: any) => void;
  register?: (userName: any) => void;
  editUser?: (userData: any) => void;
};

type AuthReducerState = {
  status: string;
  isLoggedIn: boolean;
  userData: any;
};

type AuthReducerPayload = {
  payload: AuthReducerState;
  type: string;
};

const initialProps = {
  status: "INITIAL",
  isLoggedIn: false,
  userData: undefined
};
const AuthContext = createContext<AuthContextProps>(initialProps);

export const reducer = (
  state: AuthReducerState,
  action: AuthReducerPayload
): AuthReducerState => {
  switch (action.type) {
    case "AUTH/UPDATE_LOGIN_STATUS":
      return {
        ...state,
        status: action.payload.status,
        isLoggedIn: action.payload.isLoggedIn,
        userData: action.payload.userData
      };
    case "AUTH/LOGIN":
      return {
        ...state,
        status: action.payload.status,
        isLoggedIn: action.payload.isLoggedIn,
        userData: action.payload.userData
      };
    case "AUTH/EDIT_USER":
      return {
        ...state,
        userData: action.payload.userData
      };
    default:
      return state;
  }
};

const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider = ({
  children
}: {
  children: React.ReactChild;
}): React.ReactElement => {
  const [state, dispatch] = useReducer(useLogger(reducer), initialProps);
  const { user } = useUser();

  const logout = async () => {
    await post("/api/logout").then(() => {
      dispatch({
        type: "AUTH/UPDATE_LOGIN_STATUS",
        payload: {
          status: "LOGGED_OUT",
          isLoggedIn: false,
          userData: undefined
        }
      });
    });
  };

  const login = async (body) => {
    await post("/api/login", body).then(async ({ isLoggedIn }) => {
      const result = await GetUserByUserName(body.userName);
      dispatch({
        type: "AUTH/LOGIN",
        payload: {
          status: "LOGGED_IN",
          isLoggedIn,
          userData: result
        }
      });
    });
  };
  const loginFromSession = async (userName) => {
    const result = await GetUserByUserName(userName);
    dispatch({
      type: "AUTH/LOGIN",
      payload: {
        status: "LOGGED_IN",
        isLoggedIn: true,
        userData: result
      }
    });
  };

  const register = async (userName) => {
    const result = await GetUserByUserName(userName);
    await post("/api/register", userName);
    dispatch({
      type: "AUTH/LOGIN",
      payload: {
        status: "LOGGED_IN",
        isLoggedIn: true,
        userData: result
      }
    });
  };

  const editUser = async (userData) => {
    await EditUser(userData.id, userData);
    dispatch({
      type: "AUTH/EDIT_USER",
      payload: {
        status: "LOGGED_IN",
        isLoggedIn: true,
        userData
      }
    });
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
        register: (userName) => register(userName)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
