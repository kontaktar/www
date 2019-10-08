import React from "react";
import PropTypes from "prop-types";
import { Button, Input } from "components";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <Input className={styles.input} />
      <Button modifier={["search"]} />
      <Button modifier={["search-exit"]} />
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  className: PropTypes.string
};
SearchBar.defaultProps = {
  className: ""
};
