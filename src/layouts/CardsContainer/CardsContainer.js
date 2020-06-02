import React from "react";
import PropTypes from "prop-types";
import styles from "./CardsContainer.module.scss";

const CardsContainer = ({ children, ...props }) => {
  return <div className={styles.cards_container}>{children}</div>;
};

export default CardsContainer;

CardsContainer.propTypes = {
  children: PropTypes.node.isRequired
};
