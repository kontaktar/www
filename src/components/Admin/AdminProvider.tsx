import React, {
  createContext,
  ReactChild,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import useSWR from "swr";
import { Endpoint, UserData } from "types";
import { GetIsAdmin } from "lib/endpoints";
import useUser from "lib/useUser";

export type AdminReducerState = {
  isAdmin: boolean;
  users: UserData[];
  mutateUsers?: () => void;
};

export const initialState: AdminReducerState = {
  isAdmin: false,
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
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const { data: users, error, mutate: mutateUsers } = useSWR(Endpoint.Users);
  const { user } = useUser();

  useEffect(() => {
    if (user?.details?.phoneNumber && user?.details?.id) {
      checkAdmin();
    }
  }, [user]);

  const checkAdmin = async () => {
    setAdmin(await GetIsAdmin(user?.details?.phoneNumber, user?.details?.id));
  };

  const contextValues = useMemo(
    () => ({
      isAdmin,
      users,
      mutateUsers
    }),
    [users, isAdmin, mutateUsers]
  );
  return (
    <AdminContext.Provider value={contextValues}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;