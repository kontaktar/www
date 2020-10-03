/* eslint-disable react/prop-types */
import React from "react";
import { TextField as MUITextField } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./TextArea.module.scss";

const TextArea = ({ className, error, label, ...props }) => {
  // const { className, error, label, value } = props;
  // const [text, setText] = React.useState(value);

  // const handleChange = (event) => {
  //   setText(event.target.value);
  // };
  return (
    <div className={`${styles.textarea} ${className}`}>
      {label && <span className={label && styles.label}>{error || label}</span>}
      <MUITextField
        id="standard-multiline-flexible"
        multiline
        rows="10"
        {...props}
        // rowsMax="10"
        // value={text}
        // onChange={handleChange}
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
