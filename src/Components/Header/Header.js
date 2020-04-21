/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
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
  const [openBurger, setOpenBurger] = useState(false);

  const mobileView = width < 700; // TODO: adjust this number
  // const openBurger = () => {

  //   console.log("test");
  // };
  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles.logo_area}>
        {width < screensizes.default ? <Logo /> : <Logo withTitle />}
      </div>
      {mobileView ? (
        <>
          {!openBurger ? (
            <Button onClick={() => setOpenBurger(true)}>
              <p> closed menu </p>
            </Button>
          ) : (
            <div className={styles.fullscreen}>
              <Button onClick={() => setOpenBurger(false)}>
                <p> open menu </p>
              </Button>
            </div>
          )}
        </>
      ) : (
        <div role="navigation" className={styles.navigation}>
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
      )}
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
