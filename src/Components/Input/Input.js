import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

// todo add clicker on hover
const Input = ({ error, id, label, placeholder, value }) => {
  return (
    <div className={styles.input_wrapper}>
      <label htmlFor={id} className={cx({ [styles.error]: error })}>
        <span className={styles.label}>{error || label}</span>
        <input type="text" id={id} placeholder={placeholder} value={value} />
      </label>
    </div>
  );
};

export default Input;

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string
};
Input.defaultProps = {
  className: "",
  error: undefined,
  label: undefined,
  placeholder: undefined,
  value: undefined
};
