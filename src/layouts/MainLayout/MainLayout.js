import React from "react";
import PropTypes from "prop-types";
import { Footer, Header } from "components";
import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};
