/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import Downshift from "downshift";
import { Card } from "components";
import users from "../../data/all-users-mock.js";
import styles from "./SearchContainer.module.scss";

const SearchContainer = () => {
  const [experienceIdMatchingInput, setExperienceId] = useState(0);
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
            {isOpen ? (
              users
                .filter(
                  (user) =>
                    !inputValue ||
                    user.name
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    user.experience.find((experience, i) => {
                      const matchingDescription = experience.description
                        .toLowerCase()
                        .includes(inputValue.toLowerCase());
                      if (matchingDescription) {
                        setExperienceId(i);
                      }
                      return matchingDescription || null;
                    })
                )
                .map((user, index) => (
                  <Card
                    index
                    {...getItemProps({
                      key: `${user.name + user.id + experienceIdMatchingInput}`,
                      index,
                      item: user
                    })}
                    description={
                      user.experience[experienceIdMatchingInput].description
                    }
                    name={user.name}
                  />
                ))
            ) : (
              <p> Því miður fundust engar leitarniðurstöður</p>
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
