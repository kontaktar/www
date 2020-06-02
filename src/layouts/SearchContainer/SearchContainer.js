import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Card, SearchBar } from "components";
import { CardsContainer } from "layouts";
import styles from "./SearchContainer.module.scss";

const SearchContainer = ({ cardsToDisplay, searchInput, onSearch }) => {
  const [searchValue, setSearchValue] = useState(searchInput);
  const store = useSelector((state) => state);
  const onSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };
  const cardPlaceholder = () => {
    return store.searches.isFetching ? (
      <p>LOADING</p>
    ) : (
      <p>Engar niðurstöður</p>
    );
  };
  return (
    <div className={styles.root}>
      <div className={styles.search_bar}>
        <SearchBar value={searchValue} onChange={onSearchChange} />
        <SearchBar.Results
          number={(cardsToDisplay && Object.values(cardsToDisplay).length) || 0}
        />
      </div>
      <CardsContainer>
        {cardsToDisplay && Object.values(cardsToDisplay).length > 0
          ? Object.values(cardsToDisplay).map((card) => {
              return (
                <Card
                  title={card.title}
                  description={card.description}
                  years={card.years}
                  months={card.months}
                />
              );
            })
          : cardPlaceholder()}
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
