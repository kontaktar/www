/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import arrayMove from "array-move";
import isEqual from "lodash.isequal";
import PropTypes from "prop-types";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { useAppDispatch, useAppSelector } from "store";
// import { editUserExperiences } from "store/experiences";
import useAuth from "hooks/useAuth";
import { Card } from "components";
import { CardsContainer } from "layouts";
import styles from "./DragableCardContainer.module.scss";

/* Dragable SortableItem is not working on mobile */
// const SortableItem = sortableElement(({ cardContent, handleEdit }) => {

// bypassing it:
const SortableItem = ({ cardContent, handleEdit, index }) => {
  return (
    <li
      key={cardContent.id + cardContent.title}
      style={{ listStyle: " none" }}
      className={`item_${cardContent.id}`}
    >
      {/* This wrapper is crucial for the dragging to work: https://github.com/clauderic/react-sortable-hoc/issues/367#issuecomment-380523336 */}
      <Card
        id={index}
        editMode
        experienceId={cardContent.id}
        description={cardContent.description}
        title={cardContent.title}
        published={cardContent.published}
        months={cardContent.months || "0"}
        years={cardContent.years || "0"}
        onEdit={handleEdit}
      />
    </li>
  );
};

const SortableContainer = sortableContainer(({ children }) => {
  return <CardsContainer addNewItemButton>{children}</CardsContainer>;
});
// eslint-disable-next-line react/prop-types
const DragableCardContainer = ({ userId, items, handleEdit }) => {
  // eslint-disable-next-line no-param-reassign
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state);
  const { user } = useAuth();

  const [arrangement, setArrangement] = useState(items);
  async function updateOrder(rearrangeItems) {
    const itemsInNewOrder = rearrangeItems.map((experience, index) => {
      return {
        id: experience.id,
        title: experience.title,
        description: experience.description,
        years: experience.years,
        months: experience.months,
        published: experience.published,
        order: index + 1
      };
    });
    dispatch(editUserExperiences(userId, itemsInNewOrder, user.firebase.token));
  }
  const onChange = ({ oldIndex, newIndex }) => {
    // eslint-disable-next-line no-unused-expressions
    if (oldIndex !== newIndex && newIndex !== null) {
      setArrangement(arrayMove(arrangement, oldIndex, newIndex));
      updateOrder(arrayMove(items, oldIndex, newIndex));
    }
  };

  useEffect(() => {
    if (!isEqual(items, arrangement)) {
      setArrangement(items);
    }
  }, [items, arrangement]);

  const SORTING_STARTS_IN_PIXELS = 10;
  return (
    <SortableContainer
      helperClass={styles.sortable_container}
      distance={SORTING_STARTS_IN_PIXELS}
      hideSortableGhost
      axis="xy"
      onSortEnd={onChange}
    >
      {arrangement.map((card, index) => {
        return (
          <SortableItem
            // eslint-disable-next-line react/no-array-index-key
            key={`item-${card.id}-${index}`}
            index={index}
            handleEdit={handleEdit}
            cardContent={card}
          />
        );
      })}
    </SortableContainer>
  );
};

export default DragableCardContainer;

DragableCardContainer.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired
};
DragableCardContainer.defaultProps = {
  className: ""
};
