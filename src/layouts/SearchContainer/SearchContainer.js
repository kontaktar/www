/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
// import Downshift from "downshift";
// eslint-disable-next-line no-unused-vars
import { Card, SearchBar } from "components";
import { CardsContainer } from "layouts";
// import users from "../../data/all-users-mock";
import styles from "./SearchContainer.module.scss";

// TODO: Keep input value state when clicked away

// eslint-disable-next-line react/prop-types
const SearchContainer = ({ cardsToDisplay, searchInput, onSearch }) => {
  return (
    <div className={styles.root}>
      <div className={styles.search_bar}>
        <SearchBar /> {/* TODO: */}
        <SearchBar.Results number={Object.values(cardsToDisplay).length} />
      </div>
      <CardsContainer>
        {cardsToDisplay && Object.values(cardsToDisplay).length > 0 ? (
          Object.values(cardsToDisplay).map((card) => {
            return (
              <Card
                title={card.title}
                description={card.description}
                years={card.years}
                months={card.months}
              />
            );
          })
        ) : (
          <p> Engar niðurstöður </p>
        )}
      </CardsContainer>
    </div>
  );
  // return (
  //   <>
  //     {cardsToDisplay.map((experience, i) => (
  //       <Card
  //         index
  //         {...getItemProperties({
  //           key: `${user.firstName + user.id + i}`,
  //           index,
  //           item: user
  //         })}
  //         linkToProfile={user.userName}
  //         description={
  //           (user.experience[i] && user.experience[i].description) || ""
  //         }
  //         title={(user.experience[i] && user.experience[i].title) || ""}
  //         years={(user.experience[i] && user.experience[i].length.years) || ""}
  //         months={
  //           (user.experience[i] && user.experience[i].length.months) || ""
  //         }
  //       />
  //     ))}
  //   </>
  // );
};

export default SearchContainer;

SearchContainer.propTypes = {
  searchInput: PropTypes.string
};

SearchContainer.defaultProps = {
  searchInput: null
};
