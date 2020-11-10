import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import screensizes from "data/screensizes";
import Link from "next/link";
import cx from "classnames";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, DropdownMenu, Logo } from "components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Header.module.scss";

type Props = {
  className?: string;
  noDistraction: boolean;
};
const Header = ({
  className,
  noDistraction = false
}: Props): React.ReactElement => {
  const { width } = useWindowDimensions();
  const { isLoggedIn, logout } = useAuth();
  const [openBurger, setOpenBurger] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const [hamburgerFocus, setHamburgerFocus] = useState(false);

  const mobileView = width < screensizes.tabletsPortrait;
  const tabletPortrait = width < screensizes.tabletsPortrait;

  return (
    <div className={styles.root} {...useMaxWidth()}>
      <div className={cx(styles.header, className)}>
        <div className={styles.logo_area}>
          {width < screensizes.default ? <Logo /> : <Logo withTitle />}
        </div>
        {!noDistraction && (
          <>
            {mobileView ? (
              <>
                {!openBurger ? (
                  <>
                    <Button.Hamburger
                      hasFocus={hamburgerFocus}
                      onClick={(event) => {
                        setOpenBurger(false);
                        setAnchorElement(event.currentTarget);
                        setHamburgerFocus(true);
                      }}
                    />
                    <DropdownMenu
                      onClose={() => {
                        setAnchorElement(null);
                        setHamburgerFocus(false);
                      }}
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
                  <Button className={styles.login} onClick={() => logout()}>
                    Útskrá
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
