import React, {
  createContext,
  ReactChild,
  ReactElement,
  useCallback,
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
  const {
    data: users,
    error,
    mutate: mutateUsers
  } = useSWR(isAdmin ? Endpoint.Users : null);
  const { user } = useUser();

  console.log("RENDERED: AdminProvider");

  const checkAdmin = async () =>
    setAdmin(await GetIsAdmin(user?.details?.phoneNumber, user?.details?.id));

  useEffect(() => {
    if (user?.details?.phoneNumber && user?.details?.id) {
      console.log("setting admin");
      checkAdmin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user?.details]);

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
AdminProvider.whyDidYouRender = true;

export default AdminProvider;
