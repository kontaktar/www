/* eslint-disable no-nested-ternary */
import { ReactElement, useEffect, useState } from "react";
import AvailableIcon from "@material-ui/icons/CheckCircleOutline";
import NotAvailableIcon from "@material-ui/icons/HighlightOff";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";
import listOfReservedUserNames from "data/reservedUserNames";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Routes, UserEnum } from "types";
import { GetAllUserNames } from "lib/endpoints";
import useUser from "lib/useUser";
import { debug, debugError } from "helpers/debug";
import { registerErrors } from "helpers/errorMessages";
import { registerFormSchema } from "helpers/formValidationSchemas";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "./RegisterContainer.module.scss";

const RegisterContainer = (): ReactElement => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isBeingLoggedIn, setIsBeingLoggedIn] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [isUserNameTaken, setUserNameIsTaken] = useState(false);
  const [isUserNameCheckEmpty, setUserNameCheckEmpty] = useState(true);
  const [allUserNames, setAllUserNames] = useState([]);
  const users = useSelector((state) => state.users);
  const { register } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userName: "",
      ssn: "",
      firstName: "",
      lastName: "",
      email: ""
    },
    validationSchema: registerFormSchema,
    onSubmit: async (values) => {
      debug("RegisterContainer:SessionStorage:onSubmit", user);
      if (!user?.details?.phoneNumber) {
        // TODO: create modal that will run useAuth:logout and restart the login
        setErrorMessage(
          "Vinsamlegast endurhlaða vefinn og reyndu aftur, ef þessi villa heldur áfram að birtast, vinsamlegast hafðu samband"
        );
      }
      const body = {
        userName: values.userName,
        ssn: values.ssn,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: user?.details?.phoneNumber,
        createdAt: user?.details?.createdAt,
        firebaseId: user.firebase.id,
        firebaseToken: user.firebase.token
      };
      debug("RegisterContainer:onSubmit", body);
      debug("RegisterContainer:phoneNumber", user?.details?.phoneNumber);

      try {
        setLoader(true);

        await register(body);

        setHasRegistered(true);

        router.push(Routes.Profile);
      } catch (error) {
        setErrorMessage(error.message);
        debugError(`RegisterContainer: ${error.message}`);
        setLoader(false);
      }
    }
  });

  useEffect(() => {
    if (users && !users.error && hasRegistered) {
      setIsBeingLoggedIn(true);
    } else if (users.error) {
      setIsBeingLoggedIn(false);
      setErrorMessage(users.error.response.error);
    }
  }, [hasRegistered, users, users.error]);

  useEffect(() => {
    if (
      formik.values.userName.length > 2 && // TODO: we want to show the minmum userName length error if under 3 letters.
      isUserNameTaken &&
      formik.errors.userName !== registerErrors.EXISTS_USER_NAME
    ) {
      formik.setFieldError(UserEnum.UserName, registerErrors.EXISTS_USER_NAME);
    }
  }, [isUserNameTaken, formik]);

  useEffect(() => {
    if (allUserNames.length === 0) {
      const fetchAllUserNames = async () => {
        setAllUserNames(await GetAllUserNames());
      };
      fetchAllUserNames();
    }
  }, []);

  const checkIfUserNameIsTaken = async (userName: string) => {
    setUserNameCheckEmpty(false);
    const isUserNameValid =
      userName.length > 2 && !listOfReservedUserNames.includes(userName);
    if (
      !isUserNameValid ||
      (allUserNames.length > 0 && allUserNames.includes(userName))
    ) {
      setUserNameIsTaken(true);
    } else {
      setUserNameIsTaken(false);
    }
  };

  return (
    <div {...useMaxWidth()}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <span data-test="RegistrationHeading" className={styles.heading}>
          Nýskráning
        </span>

        <div className={styles.row}>
          <MUIInput
            type="text"
            className={styles.form_firstName}
            id={UserEnum.FirstName}
            name={UserEnum.FirstName}
            placeholder="Fornafn"
            onChange={formik.handleChange}
            onBlur={() =>
              formik.setFieldTouched(UserEnum.FirstName, true, true)
            }
            value={formik.values.firstName}
            error={formik.errors.firstName}
            isTouched={formik.touched.firstName}
            data-test="FirstNameInput"
          />
          <MUIInput
            type="text"
            className={styles.form_lastName}
            id={UserEnum.LastName}
            name={UserEnum.LastName}
            placeholder="Eftirnafn"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched(UserEnum.LastName, true, true)}
            value={formik.values.lastName}
            error={formik.errors.lastName}
            isTouched={formik.touched.lastName}
            data-test="LastNameInput"
          />
        </div>
        <div className={styles.row}>
          <MUIInput
            type="number"
            id={UserEnum.Kennitala}
            name={UserEnum.Kennitala}
            className={styles.form_ssn}
            placeholder="Kennitala"
            onChange={formik.handleChange}
            onBlur={() =>
              formik.setFieldTouched(UserEnum.Kennitala, true, true)
            }
            value={formik.values.ssn.toString()}
            error={formik.errors.ssn}
            isTouched={formik.touched.ssn}
            data-test="KennitalaInput"
          />
          <MUIInput
            type="text"
            id={UserEnum.Email}
            name={UserEnum.Email}
            className={styles.form_email}
            placeholder="Netfang"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched(UserEnum.Email, true, true)}
            value={formik.values.email}
            error={formik.errors.email}
            isTouched={formik.touched.email}
            data-test="EmailInput"
          />
        </div>
        <div className={styles.row}>
          <div className={styles.row}>
            <div className={styles.display_username_card}>
              <span className={styles.info}>
                Svona mun slóðin á þinn prófil líta út.
              </span>
              <span className={styles.url}>
                kontaktar.is/
                <strong>{formik.values.userName || "notandi"}</strong>
              </span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.username_icon}>
              {isUserNameCheckEmpty ? (
                <CircleIcon className={styles.icon_inactive} />
              ) : isUserNameTaken ? (
                <NotAvailableIcon className={styles.icon_not_available} />
              ) : (
                <AvailableIcon className={styles.icon_is_checked} />
              )}
            </div>

            <MUIInput
              type="text"
              className={styles.form_userName}
              id={UserEnum.UserName}
              name={UserEnum.UserName}
              placeholder="Notendanafn / slóð"
              onChange={(event) => {
                formik.handleChange(event);
                setUserNameCheckEmpty(true);
                checkIfUserNameIsTaken(event.target.value);
              }}
              onBlur={(event) => {
                formik.setFieldTouched(UserEnum.UserName, true, true);
                checkIfUserNameIsTaken(event.target.value);
              }}
              value={formik.values.userName}
              error={formik.errors.userName}
              isTouched={formik.touched.userName}
              data-test="UserNameInput"
            />
          </div>
        </div>
        <p className={styles.error}>{errorMessage}</p>
        <Button
          disabled={isBeingLoggedIn}
          type="submit"
          isLoading={isLoading}
          className={styles.button}
          data-test="RegisterNewUserButton"
        >
          Nýskrá
        </Button>
      </form>
    </div>
  );
};

export default RegisterContainer;
