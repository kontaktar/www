import React from "react";
import PropTypes from "prop-types";
import styles from "./CardsContainer.module.scss";

const CardsContainer = ({ children, downshiftMenuProperties, ...props }) => {
  return (
    <div className={styles.cards_container} {...downshiftMenuProperties}>
      {children}
    </div>
  );
};

export default CardsContainer;

CardsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  downshiftMenuProperties: PropTypes.object.isRequired
};
