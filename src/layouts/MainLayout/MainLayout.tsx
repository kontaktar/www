import React from "react";
import useMaxWidth from "hooks/useMaxWidth";
import { Footer, Header } from "components";
import styles from "./MainLayout.module.scss";

type Props = {
  children: React.ReactNode;
  noDistraction?: boolean;
};

const MainLayout = ({
  children,
  noDistraction = false
}: Props): JSX.Element => {
  return (
    <div className={styles.root}>
      <Header noDistraction={noDistraction} />
      <div {...useMaxWidth()} className={styles.content}>
        <div className={styles.main_content}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
