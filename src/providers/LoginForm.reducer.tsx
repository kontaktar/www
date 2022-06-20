import { createSlice } from "@reduxjs/toolkit";

export type LoginFormContextType = {
  isVerificationCodeSent: boolean;
  errorMessage: string;
  userPhoneNumber: string;
  setVerificationCodeSent?: (f: boolean) => void;
  setErrorMessage?: (f: string) => void;
  setUserPhoneNumber?: (f: string) => void;
};
export const loginFormInitialState: LoginFormContextType = {
  errorMessage: undefined,
  isVerificationCodeSent: false,
  userPhoneNumber: undefined
};

const LoginForm = createSlice({
  name: "LoginForm",
  initialState: loginFormInitialState,
  reducers: {
    setVerificationCodeSent: (
      state: LoginFormContextType,
      action: { payload: boolean }
    ) => {
      state.isVerificationCodeSent = action.payload;
    },
    setErrorMessage: (
      state: LoginFormContextType,
      action: { payload: string }
    ) => {
      state.errorMessage = action.payload;
    },
    setUserPhoneNumber: (
      state: LoginFormContextType,
      action: { payload: string }
    ) => {
      state.userPhoneNumber = action.payload;
    }
  }
});

export const { setVerificationCodeSent, setUserPhoneNumber, setErrorMessage } =
  LoginForm.actions;
const LoginFormReducer = LoginForm.reducer;
export default LoginFormReducer;
