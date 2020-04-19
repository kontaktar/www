import React, { useState } from "react";
import arrayMove from "array-move";
import PropTypes from "prop-types";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { Card } from "components";
import { CardsContainer } from "layouts";
import styles from "./DragableCardContainer.module.scss";

const SortableItem = sortableElement(({ cardContent, handleEdit }) => {
  return (
    <div>
      {/* This extra div is crucial for the dragging to work: https://github.com/clauderic/react-sortable-hoc/issues/367#issuecomment-380523336 */}
      <Card
        editMode
        description={cardContent.description}
        title={cardContent.title}
        months={cardContent.length.month}
        years={cardContent.length.years}
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
const DragableCardContainer = ({ items, handleEdit }) => {
  // eslint-disable-next-line no-param-reassign
  const [arrangement, setArrangement] = useState(items);
  const onChange = ({ oldIndex, newIndex }) => {
    // eslint-disable-next-line no-unused-expressions
    if (oldIndex !== newIndex && newIndex !== null) {
      setArrangement(arrayMove(arrangement, oldIndex, newIndex));
    }
  };

  return (
    <SortableContainer
      helperClass={styles.sortable_container}
      distance={10}
      hideSortableGhost={false}
      axis="xy"
      onSortEnd={onChange}
    >
      {arrangement.map((value, index) => (
        <SortableItem
          // eslint-disable-next-line react/no-array-index-key
          key={`item-${index}`}
          index={index}
          handleEdit={handleEdit}
          cardContent={value}
        />
      ))}
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
