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

const NewModal = ({
  ariaLabel,
  open = false,
  className = "",
  overlayClassName = "",
  children,
  onClose,
  modalKey
}: Props): ReactElement => {
  const [showDialog, setShowDialog] = useState(open);

  const transitions = useTransition(showDialog, {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    ref: null,
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 }
  });

  useEffect(() => {
    setShowDialog(open);
  }, [open]);

  return (
    <div key={modalKey}>
      {transitions(
        (style, item, t, i) =>
          item && (
            <animated.div style={style}>
              <DialogOverlay
                className={cx(styles.new_modal, className)}
                key={modalKey}
              >
                <animated.div
                  style={{
                    transform: style?.y?.interpolate(
                      (value) => `translate3d(0px, ${value}px, 0px)`
                    ),
                    border: "none",
                    borderRadius: 10
                  }}
                >
                  <DialogContent
                    aria-label={ariaLabel}
                    key={i}
                    className={overlayClassName}
                  >
                    <Button
                      className={styles.button_clear}
                      onClick={() => {
                        setShowDialog(false);
                        onClose();
                      }}
                    >
                      <Icon
                        className={styles.close_icon}
                        name="close"
                        // onClick={onClose}
                      />
                    </Button>
                    {children}
                  </DialogContent>
                </animated.div>
              </DialogOverlay>
            </animated.div>
          )
      )}
    </div>
  );
};
export default NewModal;
