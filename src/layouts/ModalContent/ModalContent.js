/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Select, TextArea } from "components";
import styles from "./ModalContent.module.scss";

const Experience = ({ data }) => {
  // TODO: make sure data object is { description, title, years, months }
  const [userData, setUserData] = useState(data);
  const [errorMessage, setErrorMessage] = useState("");
  const isNew = Object.keys(data).length === 0;

  const saveExperience = () => {
    console.log("isNew", isNew);
    console.log("uuuu", userData);

    /*
    if isNew dispatch newExperience
    else dispatch updateExperience
    */
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className={styles.header}>Verkspjald</div>
      <div className={styles.input_line}>
        <Input
          name="title"
          label="Heiti verks"
          onChange={handleChange}
          value={userData.title}
        />
        <div className={styles.dropdown_line}>
          <Select
            name="years"
            onChange={handleChange}
            label="Lengd hæfni"
            className={styles.length_dropdown}
            value={userData.years || "1"}
          />
          <Select
            name="months"
            onChange={handleChange}
            label=""
            className={styles.length_dropdown}
            value={userData.months || "1"}
          />
        </div>
      </div>
      <TextArea
        name="description"
        onChange={handleChange}
        className={styles.textarea}
        label="Lýsing á hæfni"
        value={userData.description}
      />
      <div className={styles.button_line}>
        {errorMessage && (
          <span styles={styles.error_message}>errorMessage</span>
        )}
        <Button.Edit onClick={saveExperience} type="save" />
        <Button.Edit type="publish" />
      </div>
    </>
  );
};

const UserInformation = ({ data }) => {
  return (
    <>
      <div className={styles.header}>Verkspjald</div>
      <div className={styles.input_rows}>
        <div className={styles.input_line}>
          <Input label="Nafn" value={data.title} />
        </div>
        <div className={styles.input_line}>
          <Input label="Heimilisfang" value={data.title} />
          <Input label="Símanúmer" value={data.title} />
        </div>
        <div className={styles.input_line}>
          <Input label="Netfang" value={data.title} />
          <Input label="Vefsíða" value={data.title} />
        </div>
      </div>
      <div className={styles.button_line}>
        <Button.Edit type="save" />
        <Button.Edit type="publish" />
      </div>
    </>
  );
};

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
