import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import cx from "classnames";
import styles from "./Logo.module.scss";

const Logo = ({ className, inverted, withTitle }) => {
  return (
    <div
      className={cx(
        styles.logo_wrapper,
        { [styles.inverted]: inverted },
        className
      )}
    >
      <>
        <Link href="/">
          <div className={styles.letter}>
            <h1>K</h1>
          </div>
        </Link>
        <>{withTitle ? <Logo.Title /> : null}</>
      </>
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
