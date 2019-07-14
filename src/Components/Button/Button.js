import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

class Button extends React.Component {
  render() {
    return (
      <div className={styles.button}>
        <button type="submit" onClick={() => console.log("clicked")}>
          Hello World!
        </button>
      </div>
    );
  }
}

export default Button;

Button.propTypes = {
  /**
   * This will be used to create a description for this props in a propTable in storybook
   */
  onClick: PropTypes.func.isRequired,
};
