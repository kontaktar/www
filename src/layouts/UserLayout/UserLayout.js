import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "components";
import styles from "./UserLayout.module.scss";

const UserLayout = ({ children }) => {
  return (
    <div className={styles.user_root}>
      <div className={styles.navigation_drawer}>
        <Drawer />
      </div>
      <div className={styles.user_main_content}>{children}</div>
      <div className={styles.profile_drawer}>
        <Drawer rightSide />
      </div>
    </div>
  );
};

export default UserLayout;

UserLayout.propTypes = {
  children: PropTypes.node.isRequired
};
