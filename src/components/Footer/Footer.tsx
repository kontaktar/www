import React, { ReactElement, ReactNode } from "react";
import screensizes from "data/screensizes";
import cx from "classnames";
import useMaxWidth from "hooks/useMaxWidth";
import { Icon, Logo } from "components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Footer.module.scss";

type Props = {
  className?: ReactNode;
  userLayout?: boolean;
};
const Footer = ({ className, userLayout }: Props): ReactElement => {
  const { width } = useWindowDimensions();
  const maxWidth = useMaxWidth();
  return (
    <div className={styles.root}>
      <footer {...maxWidth} className={cx(styles.footer, className)}>
        <div className={cx(styles.info, { [styles.user_layout]: userLayout })}>
          <div className={styles.logo_wrapper}>
            {!userLayout && (
              <>
                {width < screensizes.default ? (
                  <>
                    <Logo className={styles.logo} inverted />
                  </>
                ) : (
                  <>
                    <Logo className={styles.logo} withTitle inverted />
                  </>
                )}
              </>
            )}
          </div>

          <div className={styles.row}>
            <Icon className={styles.icons} name="phone" />
            <p>862-9580</p>
          </div>
          <div className={styles.row}>
            <Icon className={styles.icons} name="email" />
            <p>kontaktar@kontaktar.is</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
