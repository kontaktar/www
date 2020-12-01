/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SvgPluses from "assets/background/SvgPluses";
import SvgSolidRing from "assets/background/SvgSolidRing";
import screensizes from "data/screensizes";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "react-redux";
import cx from "classnames";
import { Button, Carousel, SearchBar } from "components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./FrontPageContainer.module.scss";

const FrontPageContainer = () => {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState(undefined);
  const [isMobile, setMobile] = useState(undefined);

  const store = useStore();

  // useEffect(() => {
  //   setMobile(windowWidth < screensizes.tabletsLandscape);
  // }, [windowWidth]);

  const onSearchBarInput = (event) => {
    setSearchInput(event.target.value);
  };
  const onSearchBarSubmit = (event) => {
    if (event.key === "Enter") {
      setSearchInput(event.target.value);
      router.push({
        pathname: "/search",
        query: { searchInput }
      });
    }
  };

  const onSearchSubmit = () => {
    console.log(searchInput);
    // TODO:
  };
  // TODO: User should be able to enter something in the input box, then push enter to submit search.

  return (
    <div className={styles.frontpage}>
      <div className={styles.hero}>
        <h1>
          Ertu að leita að <span className={styles.highlight}>sérfræðingi</span>{" "}
          fyrir þitt fyrirtæki?
        </h1>
        <div className={styles.search}>
          <SearchBar
            onChange={onSearchBarInput}
            className={styles.search_bar}
            placeholder="Að hverju ertu að leita?"
            value={searchInput}
            onKeyDown={onSearchBarSubmit}
            onClearClicked={() => setSearchInput("")}
          />
          <Link
            href={{
              pathname: "/search",
              query: { searchInput }
            }}
          >
            <Button className={styles.search_button}>Leita</Button>
          </Link>
        </div>
        <Carousel className={styles.carousel} width={windowWidth} />
      </div>
      {/* <div className={styles.svg_container}>
        <svg
          transform="rotate(90)"
          width="532"
          height="815"
          viewBox="0 0 532 815"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M532 19.37C492.756 6.79 450.921 0 407.5 0 182.444 0 0 182.444 0 407.5S182.444 815 407.5 815c43.421 0 85.256-6.791 124.5-19.369v-197.69C496.229 621.374 453.456 635 407.5 635 281.855 635 180 533.145 180 407.5S281.855 180 407.5 180c45.956 0 88.729 13.626 124.5 37.059V19.369z"
            fill="#D0050B"
            fillOpacity="1"
          />
        </svg>
          </div>*/}

      <SvgSolidRing className={styles.solid_ring} />
      <SvgSolidRing
        className={styles.transparent_ring}
        width="620"
        height="950"
        fill="#cfb59b"
        fillOpacity="0.2"
        rotate="45"
      />
      <SvgPluses className={styles.plusses} />
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
