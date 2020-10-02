// todo split this up

import React, { useContext, useReducer } from "react";

const AuthContext = React.createContext({ status: "NOT_AUTHENTICATED" });

const initial = { status: "INITIAL " };

export const reducer = (state, action) => {
  switch (action.type) {
    case "testaction":
      return "lol";
    default:
      return "yo";
  }
};

export const useAuth = () => {
  const test = useContext(AuthContext);
  console.log("useAuth test", test);
  return {
    test
  };
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);
  dispatch("testaction");
  // const updatePointsWithSessionStorage = useCallback((pointsSelected = 0) => {
  //   dispatch(actions.onUpdatePoints(pointsSelected));
  //   SessionStorageService.set("selectedPoints", pointsSelected);
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        status: "works"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
