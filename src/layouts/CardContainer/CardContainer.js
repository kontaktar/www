import React from "react";
import PropTypes from "prop-types";
import styles from "./CardContainer.module.scss";

const CardContainer = ({ children, downshiftMenuProps, ...props }) => {
  return (
    <div className={styles.card_container} {...downshiftMenuProps}>
      {children}
    </div>
  );
};

export default CardContainer;

CardContainer.propTypes = {
  children: PropTypes.node.isRequired
};
