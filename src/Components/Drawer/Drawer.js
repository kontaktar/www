import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import styles from "./Drawer.module.scss";

const Drawer = ({ rightSide }) => {
  const [isOpen, toggleOpen] = useState(false);
  const onHover = (e) => {
    console.log(e);
    toggleOpen(true);
  };
  const offHover = () => {
    toggleOpen(false);
  };
  return (
    <div className={`${styles.wrapper} ${rightSide ? styles.right : ""}`}>
      {/* { rightSide && children } */}
      <div
        id="drawer"
        className={`${styles.drawer} ${isOpen && styles.open}`}
        onMouseOver={onHover}
        onFocus={onHover}
        onHover={onHover}
        onSelect={onHover}
        onBlur={offHover}
        onMouseLeave={offHover}
      >
        <p>Drawer</p>
        <div className={styles.navi}>
          <Button.Navigation compact={!isOpen} />
        </div>
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
