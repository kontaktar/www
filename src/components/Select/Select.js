/* eslint-disable react/prop-types */
import React from "react";
import { TextField as MUITextField } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./Select.module.scss";

// const options = [
//   {
//     value: "1",
//     label: "1"
//   },
//   {
//     value: "2",
//     label: "2"
//   },
//   {
//     value: "3",
//     label: "3"
//   },
//   {
//     value: "4",
//     label: "4"
//   }
// ];

const Select = ({ className, error, label, options, ...props }) => {
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
        {...props}
      >
        {options &&
          options.map(option => (
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
    options.push({ value: i, label: i });
  }

  return <Select options={options} name={name} {...props} />;
};

export default Select;

Select.propTypes = {
  className: PropTypes.string
};
Select.defaultProps = {
  className: ""
};
