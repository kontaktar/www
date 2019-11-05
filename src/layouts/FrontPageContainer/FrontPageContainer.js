import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, SearchBar } from "components";
import styles from "./FrontPageContainer.module.scss";

const FrontPageContainer = () => {
  const [searchInput, setSearchInput] = useState(undefined);
  const onSearchBarInput = (event) => {
    setSearchInput(event.target.value);
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
            ></SearchBar>
            <Button className={styles.search_button} onClick={onSearchSubmit}>
              Leita
            </Button>
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
