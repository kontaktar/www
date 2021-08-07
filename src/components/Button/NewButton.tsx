import React, { ReactChild, ReactElement } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./Button.module.scss";

type Props = {
  children: ReactChild;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  modifier?: Array<string>;
  isLoading?: boolean;
  type?: string;
  [x: string]: any;
};
const Button = ({
  children,
  className = "",
  disabled,
  onClick,
  modifier,
  isLoading,
  type,
  name,
  ...props
}: Props): ReactElement => {
  return (
    <button
      className={`${className} ${styles.button} ${modifier?.map(
        (m: string) => ` ${styles[m]} `
      )}`}
      // eslint-disable-next-line react/destructuring-assignment
      // data-test={props?.["data-test"] || `${name}Button`}
      id={name}
      name={name}
      disabled={disabled}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
      {...props}
      data-test={props?.["data-test"] || `${name}Button`}
    >
      {isLoading ? <CircularProgress /> : <>{children}</>}
    </button>
  );
};
export default Button;
