import React from "react";
import PropTypes from "prop-types";
import styles from "./Logo.module.scss";

const Logo = ({ className, inverted, withTitle }) => {
  return (
    <div
      className={`${styles.logo_wrapper} ${inverted &&
        styles.inverted} ${className}`}
    >
      <div className={styles.logo}>
        <h1>K</h1>
      </div>
      {withTitle && <Logo.Title />}
    </div>
  );
};

export default Logo;

Logo.Title = () => {
  return (
    <div className={styles.title}>
      <h2>Kontaktar.</h2>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  inverted: PropTypes.bool,
  withTitle: PropTypes.bool
};
Logo.defaultProps = {
  className: "",
  inverted: false,
  withTitle: false
};
