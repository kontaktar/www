import reducer, {
  setErrorMessage,
  setUserPhoneNumber,
  setVerificationCodeSent
} from "../src/providers/LoginForm.reducer";

test("setVerificationCodeSent", () => {
  expect(
    reducer(undefined, /** _previousState */ setVerificationCodeSent(true))
  ).toEqual([
    {
      isVerificationCodeSent: true
    }
  ]);
});
test("setErrorMessage", () => {
  expect(
    reducer(undefined, /** _previousState */ setErrorMessage("abc"))
  ).toEqual([
    {
      errorMessage: "abc"
    }
  ]);
});

test("setUserPhoneNumber", () => {
  expect(
    reducer(
      undefined,
      /** _previousState */ setUserPhoneNumber("+351-133456789")
    )
  ).toEqual([
    {
      userPhoneNumber: "+351-133456789"
    }
  ]);
});
