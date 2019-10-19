import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Input } from "components";
import styles from "./SearchBar.module.scss";

const SearchBar = ({ className, placeholder, ...props }) => {
  return (
    <div className={`${className} ${styles.searchbar}`}>
      <Icon className={styles.search_icon} name="search" />
      <Input
        id="searchbar"
        label={undefined}
        placeholder={placeholder}
        {...props}
        className={styles.input}
      />
      <Button modifier={["search"]}>
        <Icon className={styles.clear_icon} name="close" />
      </Button>
    </div>
  );
};

export default SearchBar;

SearchBar.Results = () => {
  return <div className={styles.results}>Svona margar niðurstöður</div>;
};

SearchBar.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string
};
SearchBar.defaultProps = {
  className: "",
  placeholder: ""
};
