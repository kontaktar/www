import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Input } from "components";
import styles from "./SearchBar.module.scss";

const SearchBar = ({ className, placeholder, value, onClear, ...props }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => setInputValue(value), [value]);

  return (
    <div className={`${className} ${styles.searchbar}`}>
      <Icon className={styles.search_icon} name="search" />
      <Input
        id="searchbar"
        label={undefined}
        placeholder={placeholder}
        value={inputValue}
        {...props}
        className={styles.input}
      />
      <Button modifier={["search"]} onClick={onClear}>
        <Icon className={styles.clear_icon} name="close" />
      </Button>
    </div>
  );
};

export default SearchBar;

SearchBar.Results = ({ number }) => {
  return <div className={styles.results}>{number} niðurstöður</div>;
};

SearchBar.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
SearchBar.defaultProps = {
  className: "",
  placeholder: ""
};

SearchBar.Results.propTypes = {
  number: PropTypes.string
};
SearchBar.Results.defaultProps = {
  number: "0"
};
