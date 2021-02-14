import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MuiInput from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
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
      <MuiInput
        fullWidth
        id="search-bar"
        type="text"
        aria-label="search"
        placeholder={placeholder}
        value={value}
        startAdornment={
          <InputAdornment position="start" className={styles.search_icon}>
            <SearchIcon fontSize="large" />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end" variant="filled">
            {value && (
              <IconButton
                type="submit"
                aria-label="clear-search"
                onClick={onClear}
              >
                <CloseIcon />
              </IconButton>
            )}
          </InputAdornment>
        }
        {...props}
      />
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
