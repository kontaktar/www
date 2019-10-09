/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import Downshift from "downshift";
import { Card, SearchBar } from "components";
import { CardContainer } from "layouts";
import users from "../../data/all-users-mock";
import styles from "./SearchContainer.module.scss";

const SearchContainer = () => {
  const [experienceId, setExperienceId] = useState(0);

  const matchingCardContent = (inputValue, allUsers) => {
    return allUsers.filter((user) => {
      const isMatchingUsername = user.name
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      const isMatchingExperience = user.experience.find((experience, i) => {
        const matchingDescription = experience.description
          .toLowerCase()
          .includes(inputValue.toLowerCase());
        if (matchingDescription) {
          setExperienceId(i);
        }
        return matchingDescription || null;
      });
      // TODO: add user.ability.find
      return !inputValue || isMatchingUsername || isMatchingExperience;
    });
  };

  const matchingCards = (inputValue, allUsers, getItemProperties) => {
    const allMatchingCards = matchingCardContent(inputValue, allUsers).map(
      (user, index) => {
        return (
          <Card
            index
            {...getItemProperties({
              key: `${user.name + user.id + experienceId}`,
              index,
              item: user
            })}
            description={user.experience[experienceId].description}
            name={user.name}
          />
        );
      }
    );
    return allMatchingCards;
  };

  return (
    <Downshift defaultIsOpen initialIsOpen>
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
              />
              {/* <label downshiftLabelProps={getLabelProps}>Leitarvél</label>{" "}
              {/* TODO: hide label but make visable for screen readers */}
              {/* <input downshiftInputProps={getInputProps} /> */}
            </div>
            <CardContainer {...getMenuProps()}>
              {allMatchingCards.length > 0 ? (
                allMatchingCards
              ) : (
                <p>Því miður fundust engar niðurstöður</p>
              )}
            </CardContainer>
          </div>
        );
      }}
    </Downshift>
  );
};

export default SearchContainer;

// SearchContainer.propTypes = {
//   children: PropTypes.node.isRequired
// };
