/* eslint-disable react/prop-types */
import React from "react";
import { TextField as MUITextField } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./Select.module.scss";

const Select = ({ className, error, label, options, name, ...props }) => {
  return (
    <div className={`${styles.select} ${className}`}>
      {label && (
        <span
          className={styles.label}
          styles={{ color: label === "." ? "white" : "black" }}
        >
          {error || label}
        </span>
      )}
      {label === "" && <div className={styles.hidden_label} />}
      <MUITextField
        id="selector"
        select
        SelectProps={{
          native: true
        }}
        inputProps={{
          "data-test": props["data-test"] || `${name}Select`
        }}
        name={name}
        {...props}
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </MUITextField>
    </div>
  );
};

Select.YearsMonths = ({ name, ...props }) => {
  const COUNTER = name === "years" ? 80 : 12;
  const options = [];
  for (let i = 0; i <= COUNTER; i += 1) {
    options.push({
      value: i,
      label: name === "years" ? `${i} ár` : `${i} mán`
    });
  }

  return <Select options={options} name={name} {...props} />;
};
Select.displayName = "Select";
export default Select;

Select.propTypes = {
  className: PropTypes.string
};
Select.defaultProps = {
  className: ""
};
