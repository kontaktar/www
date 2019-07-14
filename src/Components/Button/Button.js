import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = (props) => {
  const { children, disabled, onClick } = props;
  const clickHandler = () => {
    onClick();
  };
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={() => clickHandler()}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  /**
   * The buttons title
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
  /**
   * This will be used to create a description for this props in a propTable in storybook
   */
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  disabled: false,
};
