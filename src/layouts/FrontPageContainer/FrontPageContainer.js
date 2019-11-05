import React from "react";
import PropTypes from "prop-types";
import { Button, Carousel, SearchBar } from "components";
import styles from "./FrontPageContainer.module.scss";

const FrontPageContainer = () => {
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
              className={styles.search_bar}
              placeholder="Að hverju ertu að leita?"
            ></SearchBar>
            <Button className={styles.search_button}>Leita</Button>
          </div>
        </div>
        <div className={styles.carousel_section}>
          <Carousel></Carousel>
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
