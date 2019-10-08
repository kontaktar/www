import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Navigation } from "components";
import styles from "./Drawer.module.scss";

const Drawer = ({ open, rightSide }) => {
  const [isOpen, toggleOpen] = useState(open);

  useEffect(() => {
    toggleOpen(open);
  }, [open]);

  const onHover = () => {
    // eslint-disable-next-line no-unused-expressions
    !rightSide && toggleOpen(true);
  };
  const offHover = (event) => {
    const stillInDrawer =
      event.relatedTarget && event.relatedTarget.parentNode.id === "navi";

    // eslint-disable-next-line no-unused-expressions
    !stillInDrawer && toggleOpen(false);
  };
  const onMouseLeave = () => {
    // eslint-disable-next-line no-unused-expressions
    !rightSide && toggleOpen(false);
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
          <Drawer.Navigation isOpen={isOpen} />
        ) : (
          <p>rright-side</p>
        )}
      </div>
      {/* children */}
    </div>
  );
};

Drawer.Navigation = ({ isOpen }) => {
  return (
    <>
      <div className={styles.top_section}>
        <div className={styles.logo}>
          <h1>K</h1>
        </div>
        <div className={styles.title}>
          <h2>Kontaktar</h2>
        </div>
      </div>
      <Navigation isOpen={isOpen} />
    </>
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
