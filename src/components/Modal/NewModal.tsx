import { ReactElement, ReactNode, useEffect, useState } from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { animated, useTransition } from "react-spring";
import cx from "classnames";
import { Button, Icon } from "components";
import "@reach/dialog/styles.css";
import styles from "./Modal.module.scss";

type Props = {
  ariaLabel: string;
  modalKey?: string;
  open: boolean;
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
  onClose: () => void;
};
// eslint-disable-next-line react/prop-types
const NewModal = ({
  ariaLabel,
  open = false,
  className = "",
  overlayClassName = "",
  children,
  onClose,
  modalKey
}: Props): ReactElement => {
  const AnimatedDialogOverlay = animated(DialogOverlay);
  const AnimatedDialogContent = animated(DialogContent);
  const [showDialog, setShowDialog] = useState(open);

  const transitions = useTransition<boolean, any>(showDialog, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 }
  });

  useEffect(() => {
    setShowDialog(open);
  }, [open]);

  return (
    <div key={modalKey}>
      {transitions.map(
        ({ item, key, props: _styles }) =>
          item && (
            <AnimatedDialogOverlay
              className={cx(styles.new_modal, className)}
              style={{ opacity: _styles.opacity }}
              key={modalKey}
            >
              <AnimatedDialogContent
                aria-label={ariaLabel}
                key={key}
                className={overlayClassName}
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
                    className=""
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
