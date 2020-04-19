/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Select, TextArea } from "components";
import styles from "./ModalContent.module.scss";

const Experience = ({ data }) => {
  return (
    <>
      <div className={styles.header}>Verkspjald</div>
      <div className={styles.input_line}>
        <Input label="Heiti verks" value={data.title} />
        <div className={styles.dropdown_line}>
          <Select label="Lengd hæfni" className={styles.length_dropdown} />
          <Select label="" className={styles.length_dropdown} />
        </div>
      </div>
      <TextArea
        className={styles.textarea}
        label="Lýsing á hæfni"
        value={data.description}
      />
      <div className={styles.button_line}>
        <Button.Edit type="save" />
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
