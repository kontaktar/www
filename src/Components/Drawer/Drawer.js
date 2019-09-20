import React from "react";
import PropTypes from "prop-types";
import styles from "./Drawer.module.scss";

const Drawer = ({ rightSide }) => {
  return (
    <div className={`${styles.wrapper} ${rightSide ? styles.right : ""}`}>
      {/* { rightSide && children } */}
      <div className={styles.drawer}>
        <p>Drawer</p>
      </div>
      {/* children */}
    </div>
  );
};

export default Drawer;

Drawer.propTypes = {
  className: PropTypes.string,
  rightSide: PropTypes.bool
};
Drawer.defaultProps = {
  className: "",
  rightSide: false
};
