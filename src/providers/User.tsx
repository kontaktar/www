import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer
} from "react";
import { GetUser } from "lib/endpoints";
import { useReducerLogger } from "hooks/useReducerLogger";

import UserReducer, {
  setUser,
  UserContextType,
  userInitialState
} from "./User.reducer";

export const UserContext = createContext<UserContextType>(userInitialState);

export function useUserProvider(): UserContextType {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("No context, need to wrap UserContext.");
  }

  return context;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    useReducerLogger(UserReducer),
    userInitialState
  );

  const contextValues = useMemo(
    () => ({
      ...state,
      //   createUser: () => {
      //       if (userInfo.id !== state?.userInfo.id) {
      //           dispatch(setUserInfo?.(userInfo));
      //       }

      //   },
      //   editUser: () => {
      //       if (userInfo.id !== state?.userInfo.id) {
      //           dispatch(setUserInfo?.(userInfo));
      //       }

      //   },
      fetchUserById: async (userId: string) => {
        if (userId !== state?.user?.id) {
          let user = await GetUser(userId);
          dispatch(setUser(user));
        }
      }
      //   fetchUserByUserName: () => {
      //       if (userInfo.id !== state?.userInfo.id) {
      //           dispatch(setUserInfo?.(userInfo));
      //       }

      //   },

      //   }
    }),
    [state]
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
