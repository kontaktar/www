/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Modal from "@material-ui/core/Modal";
// eslint-disable-next-line no-unused-vars
import useMaxWidth from "hooks/useMaxWidth";
import screensizes from "data/screensizes";
import fetchJson from "lib/fetchJson";

import { Button, Logo } from "components";
// import { logout } from "utils/auth";

import useUser from "lib/useUser";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Header.module.scss";

// TOOD:
const Header = ({ className }) => {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const { width } = useWindowDimensions();
  const [openBurger, setOpenBurger] = useState(false);

  const mobileView = width < screensizes.tabletsPortrait;
  const logout = () => {
    fetchJson("/api/logout");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (isLoggedIn !== user && user.isLoggedIn) {
      setIsLoggedIn(user.isLoggedIn);
    }
  }, [user]);

  return (
    <div {...useMaxWidth()}>
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
              <Modal
                open={openBurger}
                // onClose={() => setOpenBurger(false)}
                aria-labelledby="mobile-menu"
                aria-describedby="mobile-dropdown-menu"
              >
                <div className={styles.modal_content}>
                  <Button onClick={() => setOpenBurger(false)}>
                    <p> open menu, todo </p>
                  </Button>
                </div>
              </Modal>
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
            <Link href="/subscription">
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
              <Button className={styles.login} onClick={logout}>
                Útskrá
              </Button>
            )}
          </div>
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
