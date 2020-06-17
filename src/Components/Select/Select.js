/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { TextField as MUITextField } from "@material-ui/core";

import styles from "./Select.module.scss";

const options = [
  {
    value: "1",
    label: "1"
  },
  {
    value: "2",
    label: "2"
  },
  {
    value: "3",
    label: "3"
  },
  {
    value: "4",
    label: "4"
  }
];

const Select = ({ className, error, label, ...props }) => {
  // const [selectedOption, setSelectedOption] = React.useState("EUR");

  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  return (
    <div className={`${styles.select} ${className}`}>
      {console.log(label === "")}
      {label && (
        <span
          className={styles.label}
          styles={{ color: label === "." ? "white" : "black" }}
        >
          {error || label}
        </span>
      )}
      {label === "" && <div className={styles.hidden_label}></div>}
      <MUITextField
        id="selector"
        select
        SelectProps={{
          native: true
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </MUITextField>
    </div>
  );
};

export default Select;

Select.propTypes = {
  className: PropTypes.string
};
Select.defaultProps = {
  className: ""
};
