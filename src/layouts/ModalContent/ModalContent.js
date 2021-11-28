/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useAppDispatch, useAppSelector } from "store";
import { createUserExperience, editUserExperience } from "store/experiences";
import useUser from "lib/useUser";
import { debug } from "helpers/debug";
import useAuth from "hooks/useAuth";
import {
  Button,
  Checkbox,
  Input,
  LastChange,
  Select,
  TextArea
} from "components";
import EditUser from "components/Forms/EditUser";
import { MUIInput } from "components/Input";
import styles from "./ModalContent.module.scss";

const Experience = ({ data }) => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const [isLoading, setLoading] = React.useState(false);

  const experiences = useAppSelector((state) => state.experiences);

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
        dispatch(createUserExperience(user, experience));
      } else {
        console.log("editUser::::::");
        dispatch(editUserExperience(user, experience));
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

const UserInformation = () => {
  const { user } = useUser();

  return (
    <>
      <div className={styles.header}>Breyta upplýsingum</div>
      <EditUser userData={user.details} />
    </>
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
      {userInformation && <UserInformation />}
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
