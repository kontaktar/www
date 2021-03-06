import React from "react";
import PropTypes from "prop-types";
import styles from "./CardsContainer.module.scss";

import AddItem from "./AddItem";

const CardsContainer = ({ children, addNewItemButton = false, ...props }) => {
  return (
    <ul className={styles.cards_container}>
      {children}
      {addNewItemButton && <AddItem />}
    </ul>
  );
};

export default CardsContainer;

CardsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/require-default-props
  addNewItemButton: PropTypes.bool
};
