import { useState } from "react";
import { Modal } from "components";
import { ModalContent } from "layouts";
import styles from "./additem.module.scss";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AddItem = () => {
  const [openModal, setOpenModal] = useState(false);
  const onClick = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  return (
    <>
      <button type="button" className={styles.add_new_item} onClick={onClick}>
        <span className={styles.add_new_plus}>+</span>
      </button>
      <Modal open={openModal} onClose={onCloseModal} experience>
        <ModalContent experience data={{}} />
      </Modal>
    </>
  );
};
export default AddItem;
