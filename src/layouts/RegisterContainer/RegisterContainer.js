import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useStore } from "react-redux";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, Input } from "components";
import { createUser } from "store/actions";
import styles from "./RegisterContainer.module.scss";

const RegisterContainer = () => {
  const store = useStore();
  const [newUser, setNewUser] = useState({});
  console.log("GLOBAL STORE:", store.getState());

  const dispatch = useDispatch();

  const registerNewUser = () => {
    dispatch(
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

    // TODO:
    // login user and add to auth store
    // formik plz
    console.log("GLOBAL STORE:", store.getState());
  };

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div {...useMaxWidth()} className={styles.row}>
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
      <Button type="button" onClick={registerNewUser}>
        Register
      </Button>
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
