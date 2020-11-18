/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SvgPluses from "assets/background/SvgPluses";
import SvgSolidRing from "assets/background/SvgSolidRing";
import screensizes from "data/screensizes";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "react-redux";
import cx from "classnames";
import { Button, Carousel, SearchBar } from "components";
import { breakPointSettings } from "components/Carousel/Carousel";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./FrontPageContainer.module.scss";

const FrontPageContainer = () => {
  const heroRef = React.useRef(null);
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const [searchInput, setSearchInput] = useState(undefined);
  // const [frameWidth, setFrameWidth] = useState(undefined);

  const store = useStore();

  // let observer;
  // if (process.browser) {
  //   // client side only
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   observer = React.useRef(
  //     new ResizeObserver((entries) => {
  //       // Only care about the first element, we expect one element to be watched
  //       const { width } = entries[0].contentRect;
  //       const padding = 96;
  //       if (
  //         breakPointSettings.find((s) => width + padding >= s.breakpoint) &&
  //         breakPointSettings.find((s) => width + padding >= s.breakpoint)
  //           .breakpoint !== frameWidth
  //       ) {
  //         setFrameWidth(
  //           breakPointSettings.find((s) => width + padding >= s.breakpoint)
  //             .breakpoint
  //         );
  //       }
  //     })
  //   );
  // }

  // React.useEffect(() => {
  //   if (heroRef.current) {
  //     observer.current.observe(heroRef.current);
  //   }

  //   return () => {
  //     observer.current.unobserve(heroRef.current);
  //   };
  // }, [heroRef, observer]);

  // React.useEffect(() => console.log("framewidht", windowWidth), [windowWidth]);

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
            className={cx(styles.search, {
              [styles.mobile]: windowWidth < screensizes.tabletsLandscape
            })}
          >
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
        </div>
        <Carousel className={styles.carousel} width={windowWidth} />
      </div>

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
