import React from "react";
import PropTypes from "prop-types";
import useMaxWidth from "hooks/useMaxWidth";
// eslint-disable-next-line no-unused-vars
import { Footer, Header } from "components";
import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div {...useMaxWidth()} className={styles.root}>
        <div className={styles.main_content}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};
