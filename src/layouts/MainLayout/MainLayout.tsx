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
}: Props): React.ReactElement => {
  const maxWidth = useMaxWidth();
  return (
    <div className={styles.root}>
      <Header noDistraction={noDistraction} />
      <div {...maxWidth} className={styles.content}>
        <div className={styles.main_content}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
