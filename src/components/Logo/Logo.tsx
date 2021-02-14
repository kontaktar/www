import React, { ReactElement } from "react";
import cx from "classnames";
import Link from "components/LinkWrap";
import styles from "./Logo.module.scss";

type Props = {
  className?: string;
  inverted?: boolean;
  withTitle?: boolean;
};

const Logo = ({
  className,
  inverted = false,
  withTitle = false
}: Props): ReactElement => {
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
