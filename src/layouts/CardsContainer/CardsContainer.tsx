import { ReactElement, ReactNode } from "react";
import cx from "classnames";
import { Card } from "components";
import styles from "./CardsContainer.module.scss";

import AddItem from "./AddItem";

type Props = {
  children?: ReactNode | undefined;
  className?: string;
  addNewItemButton?: boolean;
  [prop: string]: any;
};
const CardsContainer = ({
  children,
  className,
  addNewItemButton = false,
  isLoading = false,
  ...props
}: Props): ReactElement => {
  return (
    <ul className={cx(styles.cards_container, className)} {...props}>
      {!isLoading && children}
      {addNewItemButton && <AddItem />}
      {isLoading && (
        <>
          <li>
            <Card.Loader />
          </li>
          <li>
            <Card.Loader />
          </li>
          <Card.Loader />
          <Card.Loader />
        </>
      )}
    </ul>
  );
};

export default CardsContainer;
