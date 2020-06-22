/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserExperience,
  editUserExperience,
  editUser
} from "store/actions";
import { Button, Input, Select, TextArea } from "components";
import styles from "./ModalContent.module.scss";

const Experience = ({ data }) => {
  const dispatch = useDispatch();

  const store = useSelector((state) => state);
  const [experience, setExperience] = useState(data);
  const [errorMessage, setErrorMessage] = useState("");
  const [timestamp, setTimestamp] = useState(undefined);
  const isNew = Object.keys(data).length === 0;

  const validateExperience = () => {
    let message = "";

    if (Object.entries(experience).length === 0) {
      message = "Heiti verks vantar. Lýsing á hæfni vantar.";
    }
    if (!experience.title) {
      message += "Heiti verks vantar. ";
    }
    if (!experience.description) {
      message += "Lýsing á hæfni vantar.";
    }
    setErrorMessage(message);
    return message === "";
  };

  const saveExperience = () => {
    if (validateExperience()) {
      if (isNew) {
        dispatch(createUserExperience(store.auth.user.id, experience));
      } else {
        dispatch(editUserExperience(store.auth.user.id, experience));
      }
      setTimestamp(new Date());
    }
  };

  const handleChange = (event) => {
    setExperience({ ...experience, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className={styles.header}>
        {isNew ? "Nýtt verkspjald" : "Verkspjald"}
      </div>
      <div className={styles.input_line}>
        <Input
          name="title"
          label="Heiti verks"
          onChange={handleChange}
          value={experience.title}
        />
        <div className={styles.dropdown_line}>
          <Select.YearsMonths
            name="years"
            onChange={handleChange}
            label="Lengd hæfni"
            className={styles.length_dropdown}
            value={experience.years || "0"}
          />
          <Select.YearsMonths
            name="months"
            onChange={handleChange}
            label=""
            className={styles.length_dropdown}
            value={experience.months || "0"}
          />
        </div>
      </div>
      <TextArea
        name="description"
        onChange={handleChange}
        className={styles.textarea}
        label="Lýsing á hæfni"
        value={experience.description}
      />
      <div className={styles.button_line}>
        {errorMessage && (
          <span className={styles.error_message}>{errorMessage}</span>
        )}
        {timestamp && <LastChange timestamp={timestamp} />}
        <Button.Edit onClick={saveExperience} type="save" />
        <Button.Edit type="publish" />
      </div>
    </>
  );
};

const UserInformation = ({ data }) => {
  const [userInfo, setUserInfo] = useState(data);
  const [timestamp, setTimestamp] = useState(undefined);
  const dispatch = useDispatch();

  const store = useSelector((state) => state);

  const saveUserInfo = () => {
    setTimestamp(new Date());
    dispatch(editUser(store.auth.user.id, userInfo));
  };

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className={styles.header}>Breyta upplýsingum</div>
      <div className={styles.input_rows}>
        <div className={styles.input_line}>
          <Input
            label="Fornafn"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
          />
          <Input
            label="Eftirnafn"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
          />
          <Input
            label="Notendanafn"
            name="userName"
            value={userInfo.userName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_line}>
          <Input
            label="Heimilisfang"
            name="streetName"
            value={userInfo.streetName}
            onChange={handleChange}
          />
          <Input
            name="city"
            label="Bær"
            value={userInfo.city}
            onChange={handleChange}
          />
          <Input
            label="Póstfang"
            name="postalCode"
            value={userInfo.postalCode}
            onChange={handleChange}
          />
          <Input
            label="Land"
            name="country"
            value={userInfo.country}
            onChange={handleChange}
          />
          <Input
            label="Símanúmer"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_line}>
          <Input
            label="Netfang"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <Input
            label="Vefsíða"
            name="website"
            value={userInfo.website}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.button_line}>
        {timestamp && <LastChange timestamp={timestamp} />}
        <Button.Edit onClick={saveUserInfo} type="save" />
      </div>
    </>
  );
};

const LastChange = ({ timestamp }) => (
  <div style={{ marginRight: "auto" }}>
    Síðast breytt: {timestamp.getHours()}:{timestamp.getSeconds()}:
    {timestamp.getSeconds()}
  </div>
);

const ModalContent = ({ data, experience, userInformation }) => {
  return (
    <div className={styles.modalcontent}>
      {experience && <Experience data={data} />}
      {userInformation && <UserInformation data={data} />}
    </div>
  );
};

export default ModalContent;

ModalContent.propTypes = {
  className: PropTypes.string
};
ModalContent.defaultProps = {
  className: ""
};
