import { ReactElement, ReactNode, useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { animated, useTransition } from "react-spring";
import cx from "classnames";
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

const Modal = ({
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
    // ref: null,
    from: { opacity: 0, y: -1000 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 2000 }
  });

  useEffect(() => {
    setShowDialog(open);
  }, [open]);

  return (
    open && (
      <div key={modalKey}>
        {transitions(
          (style, item, t, i) =>
            item && (
              <animated.div key={modalKey}>
                <DialogOverlay
                  className={cx(styles.new_modal, className)}
                  style={{ opacity: style.opacity as any }}
                  key={modalKey}
                >
                  <animated.div>
                    <DialogContent
                      // style={{
                      //   transform: style?.y?.to(
                      //     (value) => `translate3d(0px, ${value}px, 0px)`
                      //   ),
                      //   border: "none",
                      //   borderRadius: 10
                      // }}
                      aria-label={ariaLabel}
                      key={modalKey + i}
                      className={overlayClassName}
                    >
                      <IconButton
                        disableFocusRipple
                        className={styles.button_clear}
                        type="submit"
                        aria-label="Close dialog"
                        onClick={() => {
                          onClose();
                          setShowDialog(false);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      {children}
                    </DialogContent>
                  </animated.div>
                </DialogOverlay>
              </animated.div>
            )
        )}
      </div>
    )
  );
};
export default Modal;
