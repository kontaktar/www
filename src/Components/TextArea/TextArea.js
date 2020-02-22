/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { TextField as MUITextField } from "@material-ui/core";
import styles from "./TextArea.module.scss";

const TextArea = (props) => {
  const { className, error, label } = props;
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={`${styles.textarea} ${className}`}>
      {label && <span className={label && styles.label}>{error || label}</span>}
      <MUITextField
        id="standard-multiline-flexible"
        multiline
        rows="10"
        // rowsMax="10"
        value={value}
        onChange={handleChange}
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
