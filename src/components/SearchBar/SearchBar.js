import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Button, Icon, Input } from "components";
import { fetchSearchResult, updateLatestSearch } from "store/actions";

import styles from "./SearchBar.module.scss";

const SearchBar = ({
  className,
  placeholder,
  onClearClicked,
  value,
  ...props
}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const onClear = async () => {
    onClearClicked();
    await dispatch(updateLatestSearch(""));
    if (store.searches.inputs && !store.searches.inputs[""]) {
      await dispatch(fetchSearchResult(""));
    }
  };

  return (
    <div className={`${className} ${styles.searchbar}`}>
      <Icon className={styles.search_icon} name="search-large" />
      <Input
        id="searchbar"
        label={undefined}
        placeholder={placeholder}
        className={styles.input}
        wrapperClassName={styles.input_wrapper}
        value={value}
        {...props}
      />
      {value && (
        <Button modifier={["search"]} onClick={onClear}>
          <Icon className={styles.clear_icon} name="close" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;

SearchBar.Results = ({ number = "0" }) => {
  return <div className={styles.results}>{number} niðurstöður</div>;
};

SearchBar.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onClearClicked: PropTypes.func,
  value: PropTypes.string
};
SearchBar.defaultProps = {
  className: "",
  placeholder: "",
  onClearClicked: () => {},
  value: ""
};

SearchBar.Results.propTypes = {
  number: PropTypes.string
};
SearchBar.Results.defaultProps = {
  number: "0"
};
