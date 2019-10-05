import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import styles from "./Drawer.module.scss";

const Drawer = ({ open, rightSide }) => {
  const [isOpen, toggleOpen] = useState(open);
  const onHover = (e) => {
    toggleOpen(true);
  };
  const offHover = (e) => {
    const stillInDrawer =
      e.relatedTarget && e.relatedTarget.parentNode.id === "navi";

    // eslint-disable-next-line no-unused-expressions
    !stillInDrawer && toggleOpen(false);
  };
  const onMouseLeave = () => {
    toggleOpen(false);
  };
  return (
    <div className={`${styles.wrapper} ${rightSide ? styles.right : ""}`}>
      <div
        id="drawer"
        className={`${styles.drawer} ${isOpen && styles.open}`}
        onMouseOver={onHover}
        onFocus={onHover}
        onSelect={onHover}
        onBlur={offHover}
        onMouseLeave={onMouseLeave}
      >
        {!rightSide ? (
          <>
            <div className={styles.top_section}>
              <div className={styles.logo}>
                <h1>K</h1>
              </div>
              <div className={styles.title}>
                <h2>Kontaktar</h2>
              </div>
            </div>
            <div className={styles.navi} id="navi">
              <Button.Navigation compact={!isOpen} />
              <Button.Navigation compact={!isOpen} />
              <Button.Navigation compact={!isOpen} />
              <Button.Navigation compact={!isOpen} />
            </div>
          </>
        ) : (
          <p>rright-side</p>
        )}
      </div>
      {/* children */}
    </div>
  );
};

export default Drawer;

Drawer.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  rightSide: PropTypes.bool
};
Drawer.defaultProps = {
  className: "",
  open: false,
  rightSide: false
};
