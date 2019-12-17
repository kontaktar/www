import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal as MUIModal } from "@material-ui/core";
import styles from "./Modal.module.scss";

// eslint-disable-next-line react/prop-types
const Modal = ({ open: openProperties }) => {
  const [open, setOpen] = useState(openProperties || true);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <MUIModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className={styles.modal_wrapper}>
        <p>Modal</p>
      </div>
    </MUIModal>
  );
};

export default Modal;

Modal.propTypes = {
  className: PropTypes.string
};
Modal.defaultProps = {
  className: ""
};
