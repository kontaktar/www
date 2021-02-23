/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

const MUIInput = ({
  error = undefined,
  id,
  label = undefined,
  placeholder,
  value = undefined,
  wrapperClassName = "",
  isTouched,
  ...props
}) => {
  return (
    <div id={id} className={styles.mui_wrapper}>
      <TextField
        error={isTouched && !!error}
        label={placeholder}
        defaultValue={value}
        helperText={"" || (isTouched && error)}
        variant="outlined"
        {...props}
      />
    </div>
  );
};

export default MUIInput;

MUIInput.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  isTouched: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  wrapperClassName: PropTypes.string
};
MUIInput.defaultProps = {
  className: "",
  isTouched: false,
  error: undefined,
  label: undefined,
  placeholder: undefined,
  value: undefined,
  wrapperClassName: ""
};
