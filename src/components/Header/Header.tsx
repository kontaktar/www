import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import screensizes from "data/screensizes";
import Link from "next/link";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, Logo } from "components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Header.module.scss";

type Props = {
  className?: string;
  noDistraction: boolean;
};
const Header = ({ className, noDistraction = false }: Props): JSX.Element => {
  const { isLoggedIn, logout } = useAuth();
  const { width } = useWindowDimensions();
  const [openBurger, setOpenBurger] = useState(false);

  const mobileView = width < screensizes.tabletsPortrait;

  return (
    <div className={`${styles.header} ${className}`} {...useMaxWidth()}>
      <div className={styles.logo_area}>
        {width < screensizes.default ? <Logo /> : <Logo withTitle />}
      </div>
      {!noDistraction && (
        <>
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
                <Button className={styles.login} onClick={() => logout()}>
                  Útskrá
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
