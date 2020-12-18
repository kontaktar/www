import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "store/actions";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, Input } from "components";
import styles from "./RegisterContainer.module.scss";

const RegisterContainer = () => {
  const [newUser, setNewUser] = useState({});
  const [hasRegistered, setHasRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isBeingLoggedIn, setIsBeingLoggedIn] = useState(false);
  const store = useSelector((state) => state);
  const { login } = useAuth();
  const { users } = store;

  const dispatch = useDispatch();

  const registerNewUser = async () => {
    await dispatch(
      createUser({
        ssn: newUser.ssn,
        userName: newUser.userName,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        website: newUser.website,
        phoneNumber: newUser.phoneNumber,
        streetName: newUser.streetName,
        city: newUser.city,
        postalCode: newUser.postalCode,
        country: newUser.country
      })
    );
    setHasRegistered(true);
    // TODO : FIX THIS; THIS IS NOT GOING TO WORK
    await login(newUser.userName);
  };

  useEffect(() => {
    if (users && !users.error && hasRegistered) {
      // TODO: Waiting to be logged in, show a spinner?
      setIsBeingLoggedIn(true);
    } else if (users.error) {
      setIsBeingLoggedIn(false);
      setErrorMessage(users.error);
    }
  }, [hasRegistered, users, users.error]);

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  return (
    <div {...useMaxWidth()} className={styles.wrapper}>
      <span className={styles.heading}>Nýskráning</span>
      <div className={styles.row}>
        <Input
          name="userName"
          label="Notendanafn / slóð"
          onChange={handleChange}
          value={newUser.userName}
        />
        <Input
          name="password"
          label="Leyniorð"
          onChange={handleChange}
          value={newUser.password}
        />

        <Input
          name="ssn"
          label="Kennitala"
          onChange={handleChange}
          value={newUser.ssn}
        />
      </div>
      <div className={styles.row}>
        <Input
          name="firstName"
          label="Fornafn"
          onChange={handleChange}
          value={newUser.firstName}
        />
        <Input
          name="lastName"
          label="Eftirnafn"
          onChange={handleChange}
          value={newUser.lastName}
        />
      </div>
      <div className={styles.row}>
        <Input
          name="email"
          label="Email"
          onChange={handleChange}
          value={newUser.email}
        />
        <Input
          name="website"
          label="Vefsíða"
          onChange={handleChange}
          value={newUser.website}
        />
        <Input
          name="phoneNumber"
          label="Símanúmer"
          onChange={handleChange}
          value={newUser.phoneNumber}
        />
      </div>
      <div className={styles.row}>
        <Input
          name="streetName"
          label="Heimilisfang"
          onChange={handleChange}
          value={newUser.streetName}
        />
        <Input
          name="city"
          label="Bær"
          onChange={handleChange}
          value={newUser.city}
        />
        <Input
          name="postalCode"
          label="Póstnúmer"
          onChange={handleChange}
          value={newUser.postalCode}
        />
        <Input
          name="country"
          label="Land"
          onChange={handleChange}
          value={newUser.country}
        />
      </div>
      <Button
        disabled={isBeingLoggedIn}
        type="button"
        onClick={registerNewUser}
      >
        Nýskrá
      </Button>
      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage.toString()}</p>
      )}
    </div>
  );
};

export default RegisterContainer;

RegisterContainer.propTypes = {
  className: PropTypes.string
};
RegisterContainer.defaultProps = {
  className: ""
};
