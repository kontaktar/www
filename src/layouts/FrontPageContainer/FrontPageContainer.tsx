import React, { ReactElement, useState } from "react";
import SvgPluses from "assets/background/SvgPluses";
import SvgSolidRing from "assets/background/SvgSolidRing";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Button, /* Carousel,*/ SearchBar } from "components";
import Link from "components/LinkWrap";
import styles from "./FrontPageContainer.module.scss";

const FrontPageContainer = (): ReactElement => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(undefined);

  const DynamicCarousel = dynamic(() => import("components/Carousel"));

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
        <DynamicCarousel />
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
