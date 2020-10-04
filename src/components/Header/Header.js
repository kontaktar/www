import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import screensizes from "data/screensizes";
import PropTypes from "prop-types";
import Link from "next/link";
import useAuth from "hooks/useAuth.tsx";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, DropdownMenu, Logo } from "components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Header.module.scss";

const Header = ({ className }) => {
  const { width } = useWindowDimensions();
  const { isLoggedIn, logout } = useAuth();
  const [openBurger, setOpenBurger] = useState(false);
  const [anchorElement, setAnchorElement] = React.useState(null);

  const mobileView = width < screensizes.tabletsPortrait;
  const tabletPortrait = width < screensizes.tabletsPortrait;

  return (
    <div className={styles.root} {...useMaxWidth()}>
      <div className={`${styles.header} ${className}`}>
        <div className={styles.logo_area}>
          {width < screensizes.default ? <Logo /> : <Logo withTitle />}
        </div>
        {mobileView ? (
          <>
            {!openBurger ? (
              <>
                <Button.Hamburger
                  onClick={(event) => {
                    setOpenBurger(false);
                    setAnchorElement(event.currentTarget);
                  }}
                />
                <DropdownMenu
                  onClose={() => setAnchorElement(null)}
                  anchorEl={anchorElement}
                />
              </>
            ) : (
              <Modal
                open={openBurger}
                // onClose={() => setOpenBurger(false)}
                aria-labelledby="mobile-menu"
                aria-describedby="mobile-dropdown-menu"
              >
                <div className={styles.modal_content}>
                  <Button.Hamburger onClick={() => setOpenBurger(false)}>
                    <p> TODO: close menu </p>
                  </Button.Hamburger>
                </div>
              </Modal>
            )}
          </>
        ) : (
          <div role="navigation" className={styles.navigation}>
            {!tabletPortrait && (
              <Link href="/">
                <Button className={styles.tab} modifier={["borderless"]}>
                  Kontaktar
                </Button>
              </Link>
            )}
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
