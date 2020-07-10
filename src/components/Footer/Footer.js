import React from "react";
import PropTypes from "prop-types";

import { Icon, Logo } from "components";
import useMaxWidth from "hooks/useMaxWidth";
import styles from "./Footer.module.scss";

const Footer = ({ className }) => {
  return (
    <footer {...useMaxWidth()}>
      <div className={`${styles.footer} ${className}`}>
        <Logo className={styles.logo} withTitle inverted />
        <Icon name="phone" />
        <p>444 4444</p>
        <Icon name="email" />
        <p>kontaktar@kontaktar.is</p>
      </div>
    </footer>
  );
};

export default Footer;

Footer.propTypes = {
  className: PropTypes.string
};
Footer.defaultProps = {
  className: ""
};
