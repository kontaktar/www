import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import NativeSelect from "@material-ui/core/NativeSelect";
import styles from "./Dropdown.module.scss";

const Dropdown = ({ id = "test", error, label = "Label" }) => {
  return (
    <div className={styles.dropdown_wrapper}>
      <label htmlFor={id} className={cx({ [styles.error]: error })}>
        <span className={styles.label}>{error || label}</span>
        <select id={id}>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </label>
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  className: PropTypes.string
};
Dropdown.defaultProps = {
  className: ""
};
