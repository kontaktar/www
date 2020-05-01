import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { Footer, Header } from "components";
import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.main_content}>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};
