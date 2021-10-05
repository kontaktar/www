import React, {
  createContext,
  ReactChild,
  ReactElement,
  useContext,
  useMemo
} from "react";
import useSWR from "swr";
import { Endpoint, UserData } from "types";

export type AdminReducerState = {
  users: UserData[];
  mutateUsers?: () => void;
};

export const initialState: AdminReducerState = {
  users: []
};

const AdminContext = createContext<AdminReducerState>(initialState);

export function useAdmin(): AdminReducerState {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("No context, need to wrap AdminProvider.");
  }

  return context;
}

const AdminProvider = ({
  children
}: {
  children: ReactChild;
}): ReactElement => {
  const { data: users, error, mutate: mutateUsers } = useSWR(Endpoint.Users);

  const contextValues = useMemo(
    () => ({
      users,
      mutateUsers
    }),
    [users]
  );
  return (
    <AdminContext.Provider value={contextValues}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
