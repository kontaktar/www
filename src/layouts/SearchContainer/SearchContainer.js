// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Card, SearchBar } from "components";
import { CardsContainer } from "layouts";
import styles from "./SearchContainer.module.scss";

const SearchContainer = ({
  cardsToDisplay,
  searchInput,
  onSearch,
  // eslint-disable-next-line react/prop-types
  onClearSearch
}) => {
  const [searchValue, setSearchValue] = useState(searchInput);
  const [cards, setCards] = useState(cardsToDisplay);
  const store = useSelector((state) => state);

  const onSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  const onSearchClear = () => {
    setSearchValue("");
    onClearSearch();
  };
  const cardsPlaceholder = () => {
    return store.searches.isFetching ? (
      <p>LOADING</p>
    ) : (
      <p>Engar niðurstöður</p>
    );
  };
  if (cardsToDisplay !== cards) {
    setCards(cardsToDisplay);
  }
  return (
    <div className={styles.root}>
      <div className={styles.search_bar}>
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onClear={onSearchClear}
        />
        <SearchBar.Results number={cards && Object.values(cards).length} />
      </div>
      <CardsContainer>
        {cards
          ? Object.values(cards).map((card) => {
              return (
                <Card
                  title={card.title}
                  description={card.description}
                  years={card.years}
                  months={card.months}
                />
              );
            })
          : cardsPlaceholder()}
      </CardsContainer>
    </div>
  );
};

export default SearchContainer;

SearchContainer.propTypes = {
  cardsToDisplay: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
  searchInput: PropTypes.string
};

SearchContainer.defaultProps = {
  cardsToDisplay: [],
  searchInput: null
};
