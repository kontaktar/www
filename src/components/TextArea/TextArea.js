/* eslint-disable react/prop-types */
import React from "react";
import { TextField as MUITextField } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./TextArea.module.scss";

const TextArea = ({ className, error, label, name, ...props }) => {
  return (
    <div className={`${styles.textarea} ${className}`}>
      {label && <span className={label && styles.label}>{error || label}</span>}
      <MUITextField
        inputProps={{
          "data-test": `${name}TextArea`
        }}
        id="standard-multiline-flexible"
        multiline
        rows="10"
        name={name}
        {...props}
      />
    </div>
  );
};

export default TextArea;

TextArea.propTypes = {
  className: PropTypes.string
};
TextArea.defaultProps = {
  className: ""
};
