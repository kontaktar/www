import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { login } from "store/actions";
import useUser from "lib/useUser";
import { get } from "helpers/methods";

type AuthContextProps = {
  status: string;
  isLoggedIn: boolean;
  logout?: () => void;
};

type AuthReducerState = {
  status: string;
  isLoggedIn: boolean;
};

type AuthReducerPayload = {
  payload: AuthReducerState;
  type: string;
};

const initialProps = { status: "INITIAL", isLoggedIn: false };
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
        isLoggedIn: action.payload.isLoggedIn
      };
    default:
      return state;
  }
};

const useAuth = (): AuthContextProps => useContext(AuthContext);

// This provider is meant to be a connection between the redux store and the session storage.

export const AuthProvider = ({
  children
}: {
  children: React.ReactChild;
}): React.ReactElement => {
  const dispatchToStore = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialProps);
  const { user } = useUser();

  const logout = async () => {
    await get("/api/logout");
    dispatch({
      type: "AUTH/UPDATE_LOGIN_STATUS",
      payload: {
        status: "LOGGED_OUT",
        isLoggedIn: false
      }
    });
    // TODO: hreinsa auth store, dispatch(logout)
  };

  useEffect(() => {
    if (user && user?.isLoggedIn !== state?.isLoggedIn) {
      if (user.isLoggedIn) {
        // TODO: get rid of Auth the store
        dispatchToStore(login(user.login));
      } else if (!user.isLoggedIn) {
        // TODO: Error: Actions must be plain objects. Use custom middleware for async actions.
        // I need thunk?
        logout();
      }
      dispatch({
        type: "AUTH/UPDATE_LOGIN_STATUS",
        payload: {
          status: "FETCHED_FROM_SESSION",
          isLoggedIn: user.isLoggedIn
        }
      });
    }
  }, [dispatchToStore, state?.isLoggedIn, user]);

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
