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

const Select = () => {
  const [selectedOption, setSelectedOption] = React.useState("EUR");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className={styles.select}>
      <MUITextField
        id="standard-select-currency"
        select
        label="Select"
        value={selectedOption}
        onChange={handleChange}
        SelectProps={{
          native: true
        }}
        helperText="Please select your currency"
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
