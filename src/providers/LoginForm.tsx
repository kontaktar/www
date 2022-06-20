import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer
} from "react";
import { useReducerLogger } from "hooks/useReducerLogger";

import LoginFormReducer, {
  LoginFormContextType,
  loginFormInitialState,
  setErrorMessage,
  setUserPhoneNumber,
  setVerificationCodeSent
} from "./LoginForm.reducer";

export const LoginFormContext = createContext<LoginFormContextType>(
  loginFormInitialState
);

export function useLoginForm(): LoginFormContextType {
  const context = useContext(LoginFormContext);

  if (!context) {
    throw new Error("No context, need to wrap LoginFormContext.");
  }

  return context;
}

export const LoginFormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    useReducerLogger(LoginFormReducer),
    loginFormInitialState
  );

  const contextValues = useMemo(
    () => ({
      ...state,
      setVerificationCodeSent: (flag: boolean) => {
        if (state?.isVerificationCodeSent !== flag) {
          dispatch(setVerificationCodeSent(flag));
        }
      },
      setUserPhoneNumber: (phoneNumber: string) => {
        if (state?.phoneNumber !== phoneNumber) {
          dispatch(setUserPhoneNumber(phoneNumber));
        }
      },
      setErrorMessage: (errorMessage: string) => {
        if (state?.errorMessage !== errorMessage) {
          dispatch(setErrorMessage(errorMessage));
        }
      }
    }),
    [state]
  );

  return (
    <LoginFormContext.Provider value={contextValues}>
      {children}
    </LoginFormContext.Provider>
  );
};
