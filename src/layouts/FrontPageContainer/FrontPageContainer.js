import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Button, SearchBar } from "components";
import styles from "./FrontPageContainer.module.scss";

const FrontPageContainer = () => {
  const [searchInput, setSearchInput] = useState(undefined);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const onSearchBarInput = (event) => {
    setSearchInput(event.target.value);
  };
  const onSearchBarSubmit = (event) => {
    if (event.key === "Enter") {
      setTriggerSearch(true);
    }
    console.log(triggerSearch);
  };

  const onSearchSubmit = () => {
    console.log(searchInput);
  };

  // TODO: User should be able to enter something in the input box, then push enter to submit search.

  return (
    <div className={styles.frontpage}>
      <div className={styles.hero}>
        <div className={styles.search_section}>
          <h1>
            Ertu að leita að{" "}
            <span className={styles.highlight}>sérfræðing</span> fyrir þitt
            fyrirtæki?
          </h1>
          <div className={styles.search}>
            <SearchBar
              onChange={onSearchBarInput}
              className={styles.search_bar}
              placeholder="Að hverju ertu að leita?"
              onKeyDown={onSearchBarSubmit}
            ></SearchBar>
            {/* TODO: trigger link route onKeyDown === Enter */}
            <Link href={{ pathname: "/search", query: { searchInput } }}>
              <Button className={styles.search_button} onClick={onSearchSubmit}>
                Leita
              </Button>
            </Link>
          </div>
          <div className={styles.carousel_section}>Carousel</div>
        </div>
      </div>
    </div>
  );
};

export default FrontPageContainer;

FrontPageContainer.propTypes = {
  className: PropTypes.string
};
FrontPageContainer.defaultProps = {
  className: ""
};
