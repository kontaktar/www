/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export default ({ children }) => {
  const previousAuth = window.localStorage.getItem("authenticated") || false;
  const previousAuthBody = window.localStorage.getItem("authBody") || false;
  const [authenticated, setAuthenticated] = useState(previousAuth);
  const [authBody, setAuthBody] = useState(previousAuthBody);

  useEffect(() => {
    window.localStorage.setItem("authenticated", authenticated);
    window.localStorage.setItem("authBody", authBody);
  }, [authenticated, authBody]);

  const defaultContext = {
    authenticated,
    setAuthenticated,
    authBody,
    setAuthBody,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};
