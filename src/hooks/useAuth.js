// todo split this up

import React, { useContext, useReducer } from "react";
import { useDispatch } from "react-redux";
import { GetUserByUserName } from "src/pages/api/endpoints";
import { get } from "helpers/methods";
import { login } from "store/actions";

const AuthContext = React.createContext({ status: "INITIAL" });

const initial = { status: "NOT_AUTHENTICATED " };

export const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH/UPDATE_LOGIN_STATUS":
      return {
        ...state,
        status: action.payload.status,
        isLoggedIn: action.payload.isLoggedIn
      };
    default:
      return state;
  }
};

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const dispatchToStore = useDispatch();
  const [state, dispatch] = useReducer(reducer, initial);

  const logout = async () => {
    console.log("logout");
    console.log("logout");
    console.log("logout");
    console.log("logout");
    console.log("logout");
    console.log("logout");
    console.log("logout");
    await get("/api/logout");
    dispatch({
      type: "AUTH/UPDATE_LOGIN_STATUS",
      status: "LOGGED_OUT",
      payload: {
        isLoggedIn: false
      }
    });
    // TODO: hreinsa auth store, dispatch(logout)
  };
  const getUserSessionData = async () => {
    const userSessionData = await get("/api/user");
    if (!state.isLoggedIn && userSessionData && userSessionData.isLoggedIn) {
      const result = await GetUserByUserName(userSessionData.login);
      console.log("result", result);
      dispatchToStore(login(userSessionData.login));

      dispatch({
        type: "AUTH/UPDATE_LOGIN_STATUS",
        status: "FETCHED_FROM_SESSION",
        payload: {
          isLoggedIn: userSessionData.isLoggedIn
        }
      });
    }
    return userSessionData;
  };

  getUserSessionData();

  // useEffect(() => {

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout: () => logout()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
