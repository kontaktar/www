import React, { useContext, useReducer } from "react";
import { useDispatch } from "react-redux";
import { login } from "store/actions";
import { get } from "helpers/methods";

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
