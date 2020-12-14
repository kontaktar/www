/* eslint-disable no-unused-vars */
import React from "react";
import screensizes from "data/screensizes";
import PropTypes from "prop-types";
import cx from "classnames";
import useMaxWidth from "hooks/useMaxWidth";
import { Icon, Logo } from "components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Footer.module.scss";

const Footer = ({ className }) => {
  const { width } = useWindowDimensions();
  const maxWidth = useMaxWidth();
  return (
    <div className={styles.root}>
      <footer {...maxWidth} className={cx(styles.footer, className)}>
        <div className={styles.logo_wrapper}>
          {width < screensizes.default ? (
            <>
              {width > screensizes.tabletsPortrait ? (
                <Logo className={styles.logo} inverted />
              ) : null}
            </>
          ) : (
            <>
              <Logo className={styles.logo} withTitle inverted />
            </>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.row}>
            <Icon className={styles.icons} name="phone" />
            <p>862-9580</p>
          </div>
          <div className={styles.row}>
            <Icon className={styles.icons} name="email" />
            <p>kontaktar@kontaktar.is</p>
          </div>
        </div>
      </footer>
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
