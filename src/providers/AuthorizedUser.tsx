import React from "react";
import useSWR from "swr";
import { Endpoint, UserSessionStorage } from "types";

type Props = {
  user: UserSessionStorage;
  mutateUser: (data?: UserSessionStorage, shouldRevalidate?: boolean) => void;
};

const LoggedInUserContext = React.createContext<Props>({
  user: { isLoggedIn: false },
  mutateUser: () => {}
});

export function LoggedInUserProvider(props) {
  const { data: user, error, mutate: mutateUser } = useSWR(Endpoint.User);

  const value = React.useMemo(
    () => ({ user, error, mutateUser }),
    [user, error, mutateUser]
  );

  return <LoggedInUserContext.Provider value={value} {...props} />;
}

// a hook to use whenever we need to consume data from `GlobalStateProvider`.
// So, We don't need React.useContext everywhere we need data from GlobalStateContext.

export function useUser() {
  const context = React.useContext(LoggedInUserContext);

  if (!context) {
    throw new Error("You need to wrap LoggedInUserProvider.");
  }

  return context;
}
