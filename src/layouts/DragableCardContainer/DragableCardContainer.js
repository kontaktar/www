import React, { useState } from "react";
import arrayMove from "array-move";
import PropTypes from "prop-types";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { Card } from "components";
import { CardsContainer } from "layouts";
import styles from "./DragableCardContainer.module.scss";

const mockItems = [
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" }
];
// TODO: this is broken, is it because index is not being sent to card?

const SortableItem = sortableElement(({ cardContent, lel }) => {
  return (
    <Card editMode index title="description" description={cardContent.name} />
  );
});

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <>
      <CardsContainer>{children}</CardsContainer>
    </>
  );
});
const DragableCardContainer = ({ items }) => {
  // eslint-disable-next-line no-param-reassign
  items = mockItems;
  const [arrangement, setArrangement] = useState(items);
  const onChange = ({ oldIndex, newIndex }) => {
    // eslint-disable-next-line no-unused-expressions
    // TODO: SOMETHING IS WRONg HERE, newIndex comes as null.
    if (oldIndex !== newIndex && newIndex !== null) {
      setArrangement(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className={styles.dragablecardcontainer}>
      <SortableContainer axis="xy" onSortEnd={onChange}>
        {arrangement.map((value, index) => (
          <SortableItem
            // eslint-disable-next-line react/no-array-index-key
            key={`item-${index}`}
            index={index}
            lel={index}
            cardContent={value}
          />
        ))}
      </SortableContainer>
    </div>
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
