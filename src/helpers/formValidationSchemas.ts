import * as Yup from "yup";

const messages = {
  TOO_LONG: "Of langt",
  MINIMUM_3: "Lágmark 3 stafir.",
  MINIMUM_8: "Lágmark 8 stafir.",
  REQUIRED: "Nauðsynlegt.",
  PASSWORD_DONT_MATCH: "Lykilorð eru ekki eins."
};

const validate = {
  userName: Yup.string()
    .min(3, messages.MINIMUM_3)
    .max(50, messages.TOO_LONG)
    .required(messages.REQUIRED),
  password: Yup.string()
    // .min(8, messages.MINIMUM_8) // TODO:
    .required(messages.REQUIRED),
  //   email: Yup.string().email("Invalid email format").required("Required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], messages.PASSWORD_DONT_MATCH)
    .required(messages.REQUIRED)
};

// eslint-disable-next-line import/prefer-default-export
export const loginFormSchema = Yup.object().shape({
  userName: validate.userName,
  password: validate.password
});

export const registerFormSchema = Yup.object().shape({
  userName: validate.userName,
  password: validate.password,
  confirmPassword: validate.confirmPassword
});
