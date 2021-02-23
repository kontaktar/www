import { ReactElement, ReactNode } from "react";
import styles from "./CardsContainer.module.scss";

import AddItem from "./AddItem";

type Props = {
  children?: ReactNode | undefined;
  addNewItemButton?: boolean;
  [prop: string]: any;
};
const CardsContainer = ({
  children,
  addNewItemButton = false,
  ...props
}: Props): ReactElement => {
  return (
    <ul className={styles.cards_container} {...props}>
      {children}
      {addNewItemButton && <AddItem />}
    </ul>
  );
};

export default CardsContainer;
