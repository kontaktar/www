/* eslint-disable react/prop-types */
/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Input.module.scss";

const MUIInput = ({
  error = undefined,
  id,
  label = undefined,
  className = "",
  placeholder,
  value = undefined,
  wrapperClassName = "",
  controlValue = undefined,
  isTouched,
  ...props
}) => {
  return (
    <div id={id} className={cx(className, styles.mui_wrapper)}>
      <TextField
        data-test={props["data-test"] || `${id}Input`}
        error={isTouched && !!error}
        label={placeholder}
        defaultValue={value}
        helperText={"" || (isTouched && error)}
        variant="outlined"
        value={controlValue || undefined}
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
  wrapperClassName: PropTypes.string,
  controlValue: PropTypes.string
};
MUIInput.defaultProps = {
  className: "",
  isTouched: false,
  error: undefined,
  label: undefined,
  placeholder: undefined,
  value: undefined,
  wrapperClassName: "",
  controlValue: undefined
};
