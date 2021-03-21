import { ReactElement, ReactNode } from "react";
import cx from "classnames";
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
  ...props
}: Props): ReactElement => {
  return (
    <ul className={cx(styles.cards_container, className)} {...props}>
      {children}
      {addNewItemButton && <AddItem />}
    </ul>
  );
};

export default CardsContainer;
