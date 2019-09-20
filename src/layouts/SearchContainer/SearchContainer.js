import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "components";
import styles from "./SearchContainer.module.scss";

const SearchContainer = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.search_bar}>
        <p>search</p>
      </div>
      <div className={styles.search_results}>
        <p>search results</p>
      </div>
    </div>
  );
};

export default SearchContainer;

SearchContainer.propTypes = {
  children: PropTypes.node.isRequired
};
