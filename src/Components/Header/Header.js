/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import screensizes from "data/screensizes";
import { Button, Logo } from "components";
import { logout, useAuth } from "utils/auth";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Header.module.scss";

// TOOD:
const Header = ({ className }) => {
  const { width } = useWindowDimensions();
  const { isLoggedIn } = useAuth();

  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles.logo_area}>
        {width < screensizes.default ? <Logo /> : <Logo withTitle />}
      </div>
      <div className={styles.navigation}>
        <Link href="/">
          <Button className={styles.tab} modifier={["borderless"]}>
            Kontaktar
          </Button>
        </Link>
        <Link href="/search">
          <Button className={styles.tab} modifier={["borderless"]}>
            Leita
          </Button>
        </Link>
        <Link href="/">
          <Button className={styles.tab} modifier={["borderless"]}>
            Áskrift
          </Button>
        </Link>
        {!isLoggedIn ? (
          <Link href="/login">
            <Button className={styles.login} modifier={["inverted"]}>
              Innskráning
            </Button>
          </Link>
        ) : (
          <Button
            className={styles.login}
            onClick={logout}
            // modifier={["inverted"]}
          >
            Útskrá
          </Button>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};
Header.defaultProps = {
  className: ""
};

export default Header;
