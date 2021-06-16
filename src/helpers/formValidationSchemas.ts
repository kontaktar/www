import * as Yup from "yup";

const messages = {
  TOO_LONG: "Of langt",
  MINIMUM_3: "Lágmark 3 stafir.",
  MINIMUM_8: "Lágmark 8 stafir.",
  REQUIRED: "Nauðsynlegt.",
  PASSWORD_DONT_MATCH: "Lykilorð eru ekki eins.",
  INCORRECT_SSN_LONG: "Kennitala of löng.",
  INCORRECT_SSN_SHORT: "Kennitala of stutt.",
  INCORRECT_VERIFICATION_CODE_LENGTH: "Lengd á staðfestingarkóða er röng"
};

const validate = {
  userName: Yup.string()
    .min(3, messages.MINIMUM_3)
    .max(50, messages.TOO_LONG)
    .required(messages.REQUIRED),
  password: Yup.string()
    // .min(8, messages.MINIMUM_8) // TODO:
    .required(messages.REQUIRED),
  email: Yup.string().email("Invalid email format").required(messages.REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], messages.PASSWORD_DONT_MATCH)
    .required(messages.REQUIRED),
  ssn: Yup.string()
    .max(10, messages.INCORRECT_SSN_LONG)
    // TOOD: actually validate kennitala
    .min(10, messages.INCORRECT_SSN_SHORT)
    .required(messages.REQUIRED),
  phoneNumber: Yup.string().required(messages.REQUIRED), // TODO:
  verificationCode: Yup.string()
    .required(messages.REQUIRED)
    .min(6, messages.INCORRECT_VERIFICATION_CODE_LENGTH)
    .max(6, messages.INCORRECT_VERIFICATION_CODE_LENGTH)
    .matches(/^\d+$/)
};

// eslint-disable-next-line import/prefer-default-export
export const loginFormSchema = Yup.object().shape({
  email: validate.email,
  password: validate.password
});

export const emailConfirmationSchema = Yup.object().shape({
  email: validate.email
});

export const phoneNumberSchema = Yup.object().shape({
  phoneNumber: validate.phoneNumber
});

export const verificationCodeSchema = Yup.object().shape({
  verificationCode: validate.verificationCode
});

export const registerFormSchema = Yup.object().shape({
  userName: validate.userName,
  // password: validate.password,
  // confirmPassword: validate.confirmPassword,
  // email: validate.email,
  ssn: validate.ssn
});
