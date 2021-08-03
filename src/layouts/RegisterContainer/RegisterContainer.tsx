/* eslint-disable no-nested-ternary */
import { ReactElement, useEffect, useState } from "react";
import AvailableIcon from "@material-ui/icons/CheckCircleOutline";
import NotAvailableIcon from "@material-ui/icons/HighlightOff";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";
import listOfReservedUserNames from "data/reservedUserNames";
import firebase from "firebase/app";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Routes, SessionStorage, UserData } from "types";
import { GetAllUserNames } from "lib/endpoints";
import useUser from "lib/useUser";
import { debug, debugError } from "helpers/debug";
import { registerErrors } from "helpers/errorMessages";
import { shouldBypassFirebaseOnDevelopment } from "helpers/firebase";
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
  const [userPhoneNumber, setUserPhoneNumber] = useState(undefined);

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
      const body = {
        id:
          user?.details?.id ||
          window.sessionStorage.getItem(SessionStorage.UserId),
        userName: values.userName,
        ssn: values.ssn,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: user?.details?.phoneNumber || userPhoneNumber
      };
      debug("RegisterContainer:onSubmit", body);
      debug("RegisterContainer:phoneNumber", user?.details?.phoneNumber);
      debug("RegisterContainer:userPhoneNumber backup", userPhoneNumber);

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
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser) => {
        const userId = window.sessionStorage.getItem(SessionStorage.UserId);

        if (shouldBypassFirebaseOnDevelopment) {
          // 3/3 step in bypassing firebase on localhost
          setUserPhoneNumber(user?.details?.phoneNumber);
        } else if (
          firebaseUser.phoneNumber === user?.details?.phoneNumber &&
          firebaseUser.uid === user?.firebase?.id &&
          user?.details?.id.toString() === userId
        ) {
          setUserPhoneNumber(firebaseUser.phoneNumber);
        } else {
          debugError("user.uid !== user?.details?.firebase");
          debugError("firebaseUser.uid", firebaseUser.uid);
          debugError("user?.firebase.id", user?.firebase?.id);
          debugError("firebaseUser.phoneNumber", firebaseUser.phoneNumber);
          debugError("user?.details?.phoneNumber", user?.details?.phoneNumber);

          debugError(
            "user?.details?.id.toString()",
            user?.details?.id.toString()
          );
          debugError("userId", userId);
          router.push(Routes.Login);
        }
      });
    return () => unregisterAuthObserver(); // un-register observers on unmounts.
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
      formik.setFieldError(UserData.UserName, registerErrors.EXISTS_USER_NAME);
    }
  }, [isUserNameTaken, formik]);

  useEffect(() => {
    if (allUserNames.length === 0) {
      const fetchAllUserNames = async () => {
        setAllUserNames(await GetAllUserNames());
      };
      fetchAllUserNames();
    }
  });
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
        <span className={styles.heading}>Nýskráning</span>

        <div className={styles.row}>
          <MUIInput
            type="text"
            className={styles.form_firstName}
            id={UserData.FirstName}
            name={UserData.FirstName}
            placeholder="Fornafn"
            onChange={formik.handleChange}
            onBlur={() =>
              formik.setFieldTouched(UserData.FirstName, true, true)
            }
            value={formik.values.firstName}
            error={formik.errors.firstName}
            isTouched={formik.touched.firstName}
          />
          <MUIInput
            type="text"
            className={styles.form_lastName}
            id={UserData.LastName}
            name={UserData.LastName}
            placeholder="Eftirnafn"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched(UserData.LastName, true, true)}
            value={formik.values.lastName}
            error={formik.errors.lastName}
            isTouched={formik.touched.lastName}
          />
        </div>
        <div className={styles.row}>
          <MUIInput
            type="number"
            id={UserData.Kennitala}
            name={UserData.Kennitala}
            className={styles.form_ssn}
            placeholder="Kennitala"
            onChange={formik.handleChange}
            onBlur={() =>
              formik.setFieldTouched(UserData.Kennitala, true, true)
            }
            value={formik.values.ssn}
            error={formik.errors.ssn}
            isTouched={formik.touched.ssn}
          />
          <MUIInput
            type="text"
            id={UserData.Email}
            name={UserData.Email}
            className={styles.form_email}
            placeholder="Netfang"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched(UserData.Email, true, true)}
            value={formik.values.email}
            error={formik.errors.email}
            isTouched={formik.touched.email}
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
              id={UserData.UserName}
              name={UserData.UserName}
              placeholder="Notendanafn / slóð"
              onChange={(event) => {
                formik.handleChange(event);
                setUserNameCheckEmpty(true);
                checkIfUserNameIsTaken(event.target.value);
              }}
              onBlur={(event) => {
                formik.setFieldTouched(UserData.UserName, true, true);
                checkIfUserNameIsTaken(event.target.value);
              }}
              value={formik.values.userName}
              error={formik.errors.userName}
              isTouched={formik.touched.userName}
            />
          </div>
        </div>
        <p className={styles.error}>{errorMessage}</p>
        <Button
          disabled={isBeingLoggedIn}
          type="submit"
          isLoading={isLoading}
          className={styles.button}
        >
          Nýskrá
        </Button>
      </form>
    </div>
  );
};

export default RegisterContainer;
