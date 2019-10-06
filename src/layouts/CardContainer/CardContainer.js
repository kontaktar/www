import React from "react";
import PropTypes from "prop-types";
import styles from "./CardContainer.module.scss";

const CardContainer = ({ children, ...props }) => {
  return (
    <div className={styles.card_container} {...props}>
      {children}
    </div>
  );
};

export default CardContainer;

CardContainer.propTypes = {
  children: PropTypes.node.isRequired
};
