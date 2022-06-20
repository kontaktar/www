import React, { ReactElement, useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import SvgPluses from "assets/background/SvgPluses";
import SvgSolidRing from "assets/background/SvgSolidRing";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAppSelector } from "store";
import { randomize } from "helpers/arrays";
import { Button, SearchBar } from "components";
import Link from "components/LinkWrap";
import styles from "./FrontPageContainer.module.scss";

const FrontPageContainer = (): ReactElement => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const searchState = useAppSelector((state) => (state as any).searches);
  const [fiveRandomCards, setFiveRandomCards] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (searchState?.inputs?.[""]) {
      setFiveRandomCards(
        randomize(Object.values(searchState?.inputs?.[""])).slice(0, 5)
      );
    }
  }, [searchState?.inputs]);

  const DynamicCarousel = dynamic(() => import("components/Carousel"), {
    loading: () => <div style={{ height: "362px" }}>...</div>
  });

  const onSearchBarInput = (event) => {
    setSearchInput(event.target.value);
  };
  const onSearchBarSubmit = (event) => {
    if (event.key === "Enter") {
      setSearchInput(event.target.value);
      setIsLoading(true);
      router.push({
        pathname: "/leit",
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
              pathname: "/leit",
              query: { searchInput }
            }}
            onClick={() => setIsLoading(true)}
          >
            <Button
              type="button"
              className={styles.search_button}
              isLoading={isLoading}
            >
              {isLoading ? <CircularProgress /> : "Leita"}
            </Button>
          </Link>
        </div>
        <DynamicCarousel cards={fiveRandomCards} />
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
