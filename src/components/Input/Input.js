/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Input.module.scss";

// todo add clicker on hover
const Input = ({
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
    <div
      className={`${styles.input_wrapper} input_wrapper ${wrapperClassName}`}
    >
      <label htmlFor={id} className={cx({ [styles.error]: error })}>
        {label && <span className={label && styles.label}>{label}</span>}
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          {...props}
        />
        {isTouched && <span className={styles.error_message}>{error}</span>}
      </label>
    </div>
  );
};

export default Input;

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  isTouched: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  wrapperClassName: PropTypes.string
};
Input.defaultProps = {
  id: "",
  className: "",
  isTouched: false,
  error: undefined,
  label: undefined,
  placeholder: undefined,
  value: undefined,
  wrapperClassName: ""
};
