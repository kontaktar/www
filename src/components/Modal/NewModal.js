/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { animated, useTransition } from "react-spring";
import { Button, Icon } from "components";
import "@reach/dialog/styles.css";
import styles from "./Modal.module.scss";

// eslint-disable-next-line react/prop-types
const NewModal = ({ open = false, children, onClose }) => {
  const AnimatedDialogOverlay = animated(DialogOverlay);
  const AnimatedDialogContent = animated(DialogContent);
  const [showDialog, setShowDialog] = useState(open);

  const transitions = useTransition(showDialog, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 }
  });

  useEffect(() => {
    setShowDialog(open);
  }, [open]);

  return (
    <div>
      {transitions.map(
        ({ item, key, props: _styles }) =>
          item && (
            <AnimatedDialogOverlay
              className={styles.new_modal}
              style={{ opacity: _styles.opacity }}
            >
              <AnimatedDialogContent
                key={key}
                style={{
                  transform: _styles.y.interpolate(
                    (value) => `translate3d(0px, ${value}px, 0px)`
                  ),
                  border: "4px solid hsla(0, 0%, 0%, 0.5)",
                  borderRadius: 10
                }}
              >
                <Button
                  className={styles.button_clear}
                  onClick={() => {
                    setShowDialog(false);
                    onClose();
                  }}
                >
                  <Icon
                    // className={styles.close_icon}
                    name="close"
                    // onClick={onClose}
                  />
                </Button>
                {children}
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </div>
  );
};
export default NewModal;
