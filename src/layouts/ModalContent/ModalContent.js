/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Input } from "components";
import styles from "./ModalContent.module.scss";

const ModalContent = ({ data }) => {
  return (
    <div className={styles.modalcontent}>
      <div className="header">Verkspjald</div>
      <div>
        <Input value={data.title} />
      </div>
      <div>TextArea</div>
      {/* <p>{data.title}</p>
      <p>{data.description}</p>
      <p>{data.years}</p>
      <p>{data.months}</p> */}
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
