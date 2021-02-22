import React, { useState } from "react";
import screensizes from "data/screensizes";
import NextLink from "next/link";
import { useRouter } from "next/router";
import cx from "classnames";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, Logo } from "components";
import Link from "components/LinkWrap";
import NewModal from "components/Modal/NewModal";
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
  const router = useRouter();

  const mobileView = width < screensizes.tabletsPortrait;
  const tabletPortrait = width < screensizes.tabletsPortrait;

  return (
    <header className={styles.root} {...useMaxWidth()}>
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
                      // hasFocus={hamburgerFocus}
                      onClick={() => {
                        setOpenBurger(true);
                      }}
                    />
                  </>
                ) : (
                  <NewModal
                    ariaLabel="Valmynd"
                    open={openBurger}
                    onClose={() => setOpenBurger(false)}
                    className={styles.modal_container}
                    aria-labelledby="mobile-menu"
                    aria-describedby="mobile-dropdown-menu"
                  >
                    <div className={styles.modal_content}>
                      <div className={styles.header}>
                        <div className={styles.logo_area}>
                          <Logo />
                        </div>
                        <button
                          type="button"
                          className={styles.close_button}
                          onClick={() => setOpenBurger(false)}
                        >
                          <div />
                        </button>
                      </div>
                      <nav className={styles.mobile_navigation}>
                        <span>
                          <NextLink href="/">Kontaktar</NextLink>
                        </span>
                        <span>
                          <NextLink href="/search">Leita</NextLink>
                        </span>
                        <span>
                          <NextLink href="/subscription">Áskrift</NextLink>
                        </span>

                        <span>
                          <NextLink href="/login">Skrá inn</NextLink>
                        </span>
                      </nav>
                    </div>
                  </NewModal>
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
                <Button
                  className={styles.login}
                  onClick={
                    !isLoggedIn ? () => router.push("/login") : () => logout()
                  }
                  modifier={!isLoggedIn ? ["inverted"] : []}
                >
                  {!isLoggedIn ? "Innskráning" : "Útskrá"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
