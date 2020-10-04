import React from "react";
import PropTypes from "prop-types";
import useMaxWidth from "hooks/useMaxWidth";
import { Icon, Logo } from "components";
import styles from "./Footer.module.scss";

const Footer = ({ className }) => {
  return (
    <footer className={styles.root}>
      <div {...useMaxWidth()} className={`${styles.footer} ${className}`}>
        <Logo className={styles.logo} withTitle inverted />
        <div className={styles.info}>
          <div className={styles.row}>
            <Icon className={styles.icons} name="phone" />
            <p>444 4444</p>
          </div>
          <div className={styles.row}>
            <Icon className={styles.icons} name="email" />
            <p>kontaktar@kontaktar.is</p>
          </div>
        </div>
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
