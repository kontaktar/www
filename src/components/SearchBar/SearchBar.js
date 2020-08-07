// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Button, Icon, Input } from "components";
import { fetchSearchResult, updateLatestSearch } from "store/actions";

import styles from "./SearchBar.module.scss";

const SearchBar = ({ className, placeholder, ...props }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const onClear = async () => {
    await dispatch(updateLatestSearch(""));
    if (store.searches.inputs && !store.searches.inputs[""]) {
      await dispatch(fetchSearchResult(""));
    }
  };

  return (
    <div className={`${className} ${styles.searchbar}`}>
      <Icon className={styles.search_icon} name="search" />
      <Input
        id="searchbar"
        label={undefined}
        placeholder={placeholder}
        {...props}
        className={styles.input}
        wrapperClassName={styles.input_wrapper}
      />
      <Button modifier={["search"]} onClick={onClear}>
        <Icon className={styles.clear_icon} name="close" />
      </Button>
    </div>
  );
};

export default SearchBar;

SearchBar.Results = ({ number = "0" }) => {
  return <div className={styles.results}>{number} niðurstöður</div>;
};

SearchBar.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string
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
