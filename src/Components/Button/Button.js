/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
// import { style } from "@material-ui/system";
import { Icon } from "components";
import styles from "./Button.module.scss";

const Button = (props) => {
  const { children, className, disabled, onClick, modifier } = props;

  return (
    <button
      className={`${className} ${styles.button} ${modifier.map(
        (m) => ` ${styles[m]} `
      )}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

Button.Navigation = ({ compact = false, title, url }) => {
  return (
    <Link href={url}>
      <Button className={`${styles.navigation} ${compact && styles.compact}`}>
        <Icon className={styles.navigation_icon} name="user-profile" />
        <p>
          {/* <div className={styles.icon}>.</div> */}
          {title}
        </p>
      </Button>
    </Link>
  );
};
export default Button;

Button.Search = () => {
  return (
    <Button>
      <Icon className={styles.icon} name="search" />
    </Button>
  );
};

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
  /**
   * Modifiers available: '', 'pill', 'inverted'.
   */
  modifier: PropTypes.arrayOf(
    PropTypes.oneOf(["", "pill", "inverted", "borderless"])
  )
};

Button.defaultProps = {
  disabled: false,
  modifier: [""]
};
