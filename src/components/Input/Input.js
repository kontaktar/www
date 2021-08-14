/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Input.module.scss";

// todo add clicker on hover
const Input = ({
  error = undefined,
  name,
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
      <label htmlFor={name} className={cx({ [styles.error]: error })}>
        {label && (
          <span
            data-test={props["data-test"] || `${name}InputLabel`}
            className={label && styles.label}
          >
            {label}
          </span>
        )}
        <input
          data-test={props["data-test"] || `${name}Input`}
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value || ""}
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
