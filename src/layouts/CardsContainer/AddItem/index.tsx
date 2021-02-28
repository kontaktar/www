import { useState } from "react";
import Modal from "components/Modal";
import { ModalContent } from "layouts";
import styles from "./AddItem.module.scss";

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
      <Modal
        ariaLabel="Nýtt verkspjald"
        open={openModal}
        onClose={onCloseModal}
      >
        <ModalContent experience data={{}} />
      </Modal>
    </>
  );
};
export default AddItem;
