import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ id, label, error, checked, ...props }) => {
  return (
    <>
      <label htmlFor={id} className={cx({ [styles.error]: error })}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          {...props}
          // eslint-disable-next-line react/prop-types
          data-test={props["data-test"] || `${id}Checkbox`}
        />
        {label && (
          <span className={label && styles.label}>{error || label}</span>
        )}
      </label>
    </>
  );
};

export default Checkbox;

Checkbox.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool
};
Checkbox.defaultProps = {
  className: "",
  error: undefined,
  label: undefined,
  checked: undefined
};
