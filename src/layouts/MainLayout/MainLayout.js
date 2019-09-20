import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "components";
import { SearchContainer } from "layouts";
import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.navigation_drawer}>
        <Drawer />
      </div>
      <div className={styles.main_content}>
        <SearchContainer />
      </div>
      <div className={styles.profile_drawer}>
        <Drawer rightSide />
      </div>
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};
