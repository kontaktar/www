import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Button, Logo } from "components";
import styles from "./Header.module.scss";

const Header = ({ className }) => {
  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles.logo_area}>
        <Logo withTitle />
      </div>
      <div className={styles.navigation}>
        <Link href="/">
          <Button modifier={["borderless"]}>Kontaktar</Button>
        </Link>
        <Link href="/search">
          <Button modifier={["borderless"]}>Leita</Button>
        </Link>
        <Link href="/">
          <Button modifier={["borderless"]}>Áskrift</Button>
        </Link>
        <Link href="/login">
          <Button className={styles.login} modifier={["inverted"]}>
            Innskráning
          </Button>
        </Link>
      </div>
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
