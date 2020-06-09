/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useStore } from "react-redux";
import { Button, Carousel, SearchBar } from "components";
import screensizes from "data/screensizes";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./FrontPageContainer.module.scss";

const FrontPageContainer = () => {
  const heroRef = React.useRef(null);
  const { width: windowWidth } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState(undefined);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [frameWidth, setFrameWidth] = useState(undefined);

  const store = useStore();
  console.log("GLOBAL STORE:", store.getState());

  let observer;
  if (process.browser) {
    // client side only
    observer = React.useRef(
      new ResizeObserver((entries) => {
        // Only care about the first element, we expect one element to be watched
        const { width } = entries[0].contentRect;
        setFrameWidth(width);
      })
    );
  }

  React.useEffect(() => {
    if (heroRef.current) {
      observer.current.observe(heroRef.current);
    }

    return () => {
      observer.current.unobserve(heroRef.current);
    };
  }, [heroRef, observer]);

  const onSearchBarInput = (event) => {
    setSearchInput(event.target.value);
  };
  const onSearchBarSubmit = (event) => {
    if (event.key === "Enter") {
      setTriggerSearch(true);
    }
    // eslint-disable-next-line react/destructuring-assignment
    console.log(triggerSearch);
  };

  const onSearchSubmit = () => {
    console.log(searchInput);
  };
  // TODO: User should be able to enter something in the input box, then push enter to submit search.

  return (
    <div className={styles.frontpage}>
      <div className={styles.hero} ref={heroRef}>
        <div className={styles.search_section}>
          <h1>
            Ertu að leita að{" "}
            <span className={styles.highlight}>sérfræðingi</span> fyrir þitt
            fyrirtæki?
          </h1>
          <div
            className={`${styles.search} ${
              windowWidth < screensizes.tabletsLandscape ? styles.mobile : ""
            }`}
          >
            <SearchBar
              onChange={onSearchBarInput}
              className={styles.search_bar}
              placeholder="Að hverju ertu að leita?"
              onKeyDown={onSearchBarSubmit}
            />
            {/* TODO: trigger link route onKeyDown === Enter */}
            <Link
              href={{
                pathname: "/search",
                query: { searchInput }
              }}
            >
              <Button className={styles.search_button} onClick={onSearchSubmit}>
                Leita
              </Button>
            </Link>
          </div>
        </div>
        <Carousel width={frameWidth} />
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
