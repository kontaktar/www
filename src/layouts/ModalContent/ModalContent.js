/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { createUserExperience, editUserExperience } from "store/actions";
import useUser from "lib/useUser";
import { debug } from "helpers/debug";
import useAuth from "hooks/useAuth";
import { Button, Checkbox, Input, Select, TextArea } from "components";
import styles from "./ModalContent.module.scss";

const Experience = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [isLoading, setLoading] = React.useState(false);

  const experiences = useSelector((state) => state.experiences);

  React.useEffect(() => {
    setLoading(experiences.isFetching);
    debug("isLoading", experiences.isLoading);
  }, [experiences]);

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
        dispatch(createUserExperience(user.details.id, experience));
      } else {
        dispatch(editUserExperience(user.details.id, experience));
      }
      setTimestamp(new Date());
    }
  };

  const togglePublishState = (published) => {
    setExperience({ ...experience, published });
  };

  const handleChange = (event) => {
    setExperience({ ...experience, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className={styles.header}>
        {isNew ? "Nýtt verkspjald" : "Breyta verkspjaldi"}
      </div>
      <div className={styles.input_line}>
        <Input
          className={styles.title_input}
          id={experience.id}
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

      <div className={styles.footer}>
        {errorMessage && (
          <span className={styles.error_message}>{errorMessage}</span>
        )}
        <Checkbox
          id="publish"
          checked={experience.published}
          onChange={() => togglePublishState(!experience.published)}
          label="Í birtingu"
        />
        {timestamp && !isLoading && (
          <LastChange
            className={styles.experience_timestamp}
            timestamp={timestamp}
          />
        )}
        <Button.Edit
          className={styles.button_save}
          isLoading={isLoading}
          onClick={saveExperience}
          type="save"
        />
      </div>
    </>
  );
};

const UserInformation = ({ data }) => {
  const { editUser, status } = useAuth();
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState(user.details);
  const [timestamp, setTimestamp] = useState(undefined);
  const dispatch = useDispatch();

  const saveUserInfo = () => {
    setTimestamp(new Date());
    editUser(userInfo);
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
            id={userInfo.id + userInfo.firstName}
            label="Fornafn"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
          />
          <Input
            id={userInfo.id + userInfo.lastName}
            label="Eftirnafn"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
          />
          <Input
            id={userInfo.id + userInfo.userName}
            label="Notendanafn"
            name="userName"
            value={userInfo.userName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_line}>
          <Input
            id={userInfo.id + userInfo.streetName}
            label="Heimilisfang"
            name="streetName"
            value={userInfo.streetName}
            onChange={handleChange}
          />
          <Input
            id={userInfo.id + userInfo.city}
            name="city"
            label="Bær"
            value={userInfo.city}
            onChange={handleChange}
          />
          <Input
            id={userInfo.id + userInfo.postalCode}
            label="Póstfang"
            name="postalCode"
            value={userInfo.postalCode}
            onChange={handleChange}
          />
          <Input
            id={userInfo.id + userInfo.country}
            label="Land"
            name="country"
            value={userInfo.country}
            onChange={handleChange}
          />
          <Input
            id={userInfo.id + userInfo.phoneNumber}
            label="Símanúmer"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_line}>
          <Input
            id={userInfo.id + userInfo.email}
            label="Netfang"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <Input
            id={userInfo.id + userInfo.website}
            label="Vefsíða"
            name="website"
            value={userInfo.website}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.button_line}>
        <Button.Edit
          className={styles.button_save}
          isLoading={status === "USER_EDIT_REQUEST"}
          onClick={saveUserInfo}
          type="save"
        />
        {timestamp && status !== "USER_EDIT_REQUEST" && (
          <LastChange
            className={styles.user_info_timestamp}
            timestamp={timestamp}
          />
        )}
      </div>
    </>
  );
};

const LastChange = ({ className, timestamp }) => {
  function addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  }
  return (
    <div className={className}>
      Síðast breytt: {addZeroBefore(timestamp.getHours())}:
      {addZeroBefore(timestamp.getMinutes())}:
      {addZeroBefore(timestamp.getSeconds())}
    </div>
  );
};

const ModalContent = ({
  data,
  experience = false,
  userInformation = false
}) => {
  return (
    <div
      className={cx(styles.modalcontent, {
        [styles.user_information]: userInformation
      })}
    >
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
