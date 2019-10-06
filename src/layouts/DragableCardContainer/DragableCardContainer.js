import React, { useState } from "react";
import PropTypes from "prop-types";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { Card } from "components";
import { CardContainer } from "layouts";
import styles from "./DragableCardContainer.module.scss";

const mockItems = [
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" }
];
// const DragHandle = sortableHandle(() => <Reorder color="disabled" />);

const SortableItem = sortableElement(({ cardContent }) => {
  return (
    <Card
      index
      item="users"
      description="description"
      name={cardContent.name}
    />
  );
});

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <>
      <CardContainer>{children}</CardContainer>
    </>
  );
});
const DragableCardContainer = ({ items }) => {
  // eslint-disable-next-line no-param-reassign
  items = mockItems;
  const [arrangement, setArrangement] = useState(items);
  const onChange = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    // TODO: setum arrayMove og vista state á dragable
    // this.setState(({items}) => ({
    //   items: arrayMove(items, oldIndex, newIndex),
    // }));
  };

  return (
    <div className={styles.dragablecardcontainer}>
      <SortableContainer axis="xy" onSortEnd={onChange}>
        {items.map((value, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SortableItem
            key={`item-${index}`}
            index={index}
            cardContent={value}
          />
        ))}
      </SortableContainer>
    </div>
  );
};

export default DragableCardContainer;

DragableCardContainer.propTypes = {
  className: PropTypes.string
};
DragableCardContainer.defaultProps = {
  className: ""
};
