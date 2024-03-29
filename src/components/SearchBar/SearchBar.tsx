import React, { ReactElement } from "react";
import { NoSsr } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MuiInput from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { useAppDispatch, useAppSelector } from "store";
import { fetchSearchResult, updateLatestSearch } from "store/search";
import styles from "./SearchBar.module.scss";

type Props = {
  className?: string;
  placeholder?: string;
  onChange?: (event: any) => void;
  onClearClicked?: () => void;
  value?: string;
  onKeyDown?: (event: any) => void;
};

type ResultProps = {
  number: string;
};

const SearchBar = ({
  className,
  placeholder,
  onClearClicked,
  value,
  ...props
}: Props): ReactElement => {
  const store = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onClear = async () => {
    onClearClicked();
    await dispatch(updateLatestSearch(""));
    if (
      (store as any).searches.inputs &&
      !(store as any)?.searches.inputs[""]
    ) {
      await dispatch(fetchSearchResult(""));
    }
  };

  return (
    <div className={`${className} ${styles.searchbar}`}>
      <NoSsr>
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
              {value ? (
                <IconButton
                  type="submit"
                  aria-label="clear-search"
                  onClick={onClear}
                >
                  <CloseIcon />
                </IconButton>
              ) : (
                <></>
              )}
            </InputAdornment>
          }
          {...props}
        />{" "}
      </NoSsr>
    </div>
  );
};
SearchBar.Results = ({ number = "0" }: ResultProps): ReactElement => {
  return <div className={styles.results}>{number} niðurstöður</div>;
};

SearchBar.displayName = "SearchBar";
export default SearchBar;
