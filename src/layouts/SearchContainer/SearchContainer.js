/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { Card, SearchBar } from "components";
import { CardsContainer } from "layouts";
import users from "../../data/all-users-mock";
import styles from "./SearchContainer.module.scss";

const SearchContainer = ({ searchInput }) => {
  const [experienceId, setExperienceId] = useState(0);
  const [isMatchingContent, setMatchingContent] = useState(false);
  const matchingCardContent = (inputValue, allUsers) => {
    return allUsers.filter((user) => {
      const isMatchingUsername =
        user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(inputValue.toLowerCase());
      const isMatchingExperience = user.experience.find((experience, i) => {
        const matchingDescription = experience.description
          .toLowerCase()
          .includes(inputValue.toLowerCase());
        const matchingTitle = experience.title
          .toLowerCase()
          .includes(inputValue.toLowerCase());
        if (matchingDescription || matchingTitle) {
          // eslint-disable-next-line no-unused-expressions
          inputValue && setMatchingContent(true);
          setExperienceId(i);
        } else {
          // eslint-disable-next-line no-unused-expressions
          inputValue && setMatchingContent(false);
        }
        return matchingDescription || matchingTitle || null;
      });

      return !inputValue || isMatchingUsername || isMatchingExperience;
    });
  };

  const matchingCards = (inputValue, allUsers, getItemProperties) => {
    const allMatchingCards = matchingCardContent(inputValue, allUsers).map(
      (user, index) => {
        /* TODO: Inital render should render all experiences on each user at first */
        /* TODO: linkToProfile not correct */
        /* TODO: this "if else" here below is not doing much, do this better with actual data */
        if (isMatchingContent) {
          return (
            <Card
              index
              {...getItemProperties({
                key: `${user.firstName + user.id + experienceId}`,
                index,
                item: user
              })}
              linkToProfile={user.userName}
              description={
                (user.experience[experienceId] &&
                  user.experience[experienceId].description) ||
                ""
              }
              title={
                (user.experience[experienceId] &&
                  user.experience[experienceId].title) ||
                ""
              }
              years={
                (user.experience[experienceId] &&
                  user.experience[experienceId].length.years) ||
                ""
              }
              months={
                (user.experience[experienceId] &&
                  user.experience[experienceId].length.months) ||
                ""
              }
            />
          );
        }
        // return null;
        return (
          <>
            {user.experience.map((experience, i) => (
              <Card
                index
                {...getItemProperties({
                  key: `${user.firstName + user.id + i}`,
                  index,
                  item: user
                })}
                linkToProfile={user.userName}
                description={
                  (user.experience[i] && user.experience[i].description) || ""
                }
                title={(user.experience[i] && user.experience[i].title) || ""}
                years={
                  (user.experience[i] && user.experience[i].length.years) || ""
                }
                months={
                  (user.experience[i] && user.experience[i].length.months) || ""
                }
              />
            ))}
          </>
        );
      }
    );
    return allMatchingCards;
  };

  return (
    <Downshift
      defaultIsOpen
      initialIsOpen
      initialInputValue={searchInput || ""}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        selectedItem
      }) => {
        const allMatchingCards = matchingCards(inputValue, users, getItemProps);
        return (
          <div className={styles.root}>
            <div className={styles.search_bar}>
              <SearchBar
                downshiftLabelProps={getLabelProps()}
                downshiftInputProps={getInputProps()}
                value={inputValue}
              />
              {/* TODO: hide label but make visable for screen readers */}
            </div>
            <CardsContainer downshiftMenuProps={getMenuProps()}>
              {allMatchingCards.length > 0 ? (
                allMatchingCards
              ) : (
                <p>Því miður fundust engar niðurstöður</p>
              )}
            </CardsContainer>
          </div>
        );
      }}
    </Downshift>
  );
};

export default SearchContainer;

SearchContainer.propTypes = {
  searchInput: PropTypes.string
};

SearchContainer.defaultProps = {
  searchInput: null
};
