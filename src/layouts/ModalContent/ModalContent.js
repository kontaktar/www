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
        {/* <div className={styles.input_wrapper}> */}
        <Input label="Heiti verks" value={data.title} />
        {/* </div> */}
        <div className={styles.dropdown_line}>
          <Select label="Lengd hæfni" className={styles.length_dropdown} />
          <Select label="" className={styles.length_dropdown} />
        </div>
      </div>
      <TextArea className={styles.textarea} label="Lýsing á hæfni" />
      <div className={styles.button_line}>
        <Button.Edit type="save" />
        <Button.Edit type="publish" />
      </div>
    </>
  );
};

const ModalContent = ({ data }) => {
  return (
    <div className={styles.modalcontent}>
      <Experience data={data} />
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
