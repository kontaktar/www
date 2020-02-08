import React from "react";
import PropTypes from "prop-types";
import { TextField as MUITextField } from "@material-ui/core";
import styles from "./TextArea.module.scss";

const TextArea = () => {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={styles.textarea}>
      <MUITextField
        id="standard-multiline-flexible"
        label="Multiline"
        multiline
        rows="10"
        // rowsMax="10"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextArea;

TextArea.propTypes = {
  className: PropTypes.string
};
TextArea.defaultProps = {
  className: ""
};
