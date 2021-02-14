import React from "react";
import PropTypes from "prop-types";
import { Drawer, Footer } from "components";
import styles from "./UserLayout.module.scss";

const UserLayout = ({ children }) => {
  return (
    <div className={styles.user_root}>
      <Drawer />
      <div className={styles.user_main_content}>{children}</div>
      {/* <div className={styles.profile_drawer}>
        <Drawer rightSide />
      </div> */}
      <Footer userLayout />
    </div>
  );
};

export default UserLayout;

UserLayout.propTypes = {
  children: PropTypes.node.isRequired
};
