/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createUserExperience, editUserExperience } from "store/actions";
import { Button, Input, Select, TextArea } from "components";
import styles from "./ModalContent.module.scss";

const Experience = ({ data }) => {
  const dispatch = useDispatch();

  // useEFfect á data?

  const store = useSelector((state) => state);
  // TODO: make sure data object is { description, title, years, months }
  const [experience, setExperience] = useState(data);
  const [errorMessage, setErrorMessage] = useState("");
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
        // TODO: test
        dispatch(editUserExperience(store.auth.user.id, experience));
      }
    }
  };

  const handleChange = (event) => {
    console.log("handle", experience);
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
