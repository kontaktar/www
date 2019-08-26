import React from "react";
import PropTypes from "prop-types";
import { Footer, Header } from "components";
import styles from "./Main.module.scss";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header className={styles.layout_header} />
      <div className={styles.main_content}>{children}</div>
      <Footer className={styles.layout_footer} />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};
