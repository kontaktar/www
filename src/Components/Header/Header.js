import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Button } from "components";
import styles from "./Header.module.scss";

const Header = ({ className }) => {
  return (
    <div className={`${styles.header} ${className}`}>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
      <p>This is the header</p>
    </div>
  );
};

export default Header;

Header.propTypes = {
  className: PropTypes.string
};
Header.defaultProps = {
  className: ""
};
