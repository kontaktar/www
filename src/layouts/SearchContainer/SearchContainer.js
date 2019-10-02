/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import Downshift from "downshift";
import { Card } from "components";
import users from "../../data/all-users-mock.js";
import styles from "./SearchContainer.module.scss";

const SearchContainer = () => {
  const [experienceId, setExperienceId] = useState(0);
  const [noResults, setNoResults] = useState(false);

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
    // eslint-disable-next-line no-unused-expressions
    allMatchingCards.length === 0 && setNoResults(true);

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
      }) => (
        <div className={styles.root}>
          <div className={styles.search_bar}>
            <label {...getLabelProps()}>Leitarvél</label>{" "}
            {/* TODO: hide label but make visable for screen readers */}
            <input {...getInputProps()} />
          </div>
          <div className={styles.search_results} {...getMenuProps()}>
            {noResults ? (
              <p>Því miður fundust engar niðurstöður</p>
            ) : (
              matchingCards(inputValue, users, getItemProps)
            )}
          </div>
        </div>
      )}
    </Downshift>
  );
};

export default SearchContainer;

// SearchContainer.propTypes = {
//   children: PropTypes.node.isRequired
// };
