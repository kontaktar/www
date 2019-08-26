import React from "react";
import PropTypes from "prop-types";
import styles from "./Footer.module.scss";

const Footer = ({ className }) => {
  return (
    <div className={`${styles.footer} ${className}`}>
      <p>Footer</p>
    </div>
  );
};

export default Footer;

Footer.propTypes = {
  className: PropTypes.string
};
Footer.defaultProps = {
  className: ""
};
