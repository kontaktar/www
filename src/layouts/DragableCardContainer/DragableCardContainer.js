/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import arrayMove from "array-move";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "lodash.isequal";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { Card } from "components";
import { CardsContainer } from "layouts";
import { editUserExperiences } from "store/actions";
import styles from "./DragableCardContainer.module.scss";

const SortableItem = sortableElement(({ cardContent, handleEdit }) => {
  return (
    <div key={cardContent.id} className={cardContent.id}>
      {/* This extra div is crucial for the dragging to work: https://github.com/clauderic/react-sortable-hoc/issues/367#issuecomment-380523336 */}
      <Card
        editMode
        experienceId={cardContent.id}
        description={cardContent.description}
        title={cardContent.title}
        published={cardContent.published}
        months={cardContent.months || "0"}
        years={cardContent.years || "0"}
        onEdit={handleEdit}
      />
    </div>
  );
});

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <>
      <CardsContainer>{children}</CardsContainer>
    </>
  );
});
// eslint-disable-next-line react/prop-types
const DragableCardContainer = ({ userId, items, handleEdit }) => {
  // eslint-disable-next-line no-param-reassign
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [arrangement, setArrangement] = useState(items);
  async function updateOrder(rearrangeItems) {
    dispatch(
      editUserExperiences(
        userId,
        rearrangeItems.map((experience, index) => {
          return {
            id: experience.id,
            title: experience.title,
            description: experience.description,
            years: experience.years,
            months: experience.months,
            published: experience.published,
            order: index + 1
          };
        })
      )
    );
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
  }, [items]);

  return (
    <SortableContainer
      helperClass={styles.sortable_container}
      distance={10} // needs to be dragged 10px for the sorting to start, allows the buttons on the cards to be clickable
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
