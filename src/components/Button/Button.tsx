import React, { ReactChild, ReactElement } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import cx from "classnames";
import { Icon } from "components";
import Link from "components/LinkWrap";
import styles from "./Button.module.scss";
import colors from "styles/colors.module.scss";

type Props = {
  children: ReactChild;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  modifier?: Array<string>; // TODO: onez["", "pill", "inverted", "borderless", "rectangle", "raw"]
  isLoading?: boolean;
  type?: string;
  [x: string]: any;
};

interface StaticComponents {
  Navigation?: Props;
  CarouselNavi?: Props;
  Edit?: Props;
  Search?: Props;
  Hamburger?: Props;
}
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
}: Props & StaticComponents): ReactElement => {
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

const ButtonNavigation = ({
  compact = false,
  title,
  url,
  icon,
  onClick,
  ...props
}) => {
  return (
    <Link href={url} onClick={onClick}>
      <Button
        className={`${styles.navigation} ${compact && styles.compact}`}
        {...props}
      >
        <>
          <Icon
            color={colors.greyLight}
            className={styles.navigation_icon}
            name={icon}
          />
          <p>{title}</p>
        </>
      </Button>
    </Link>
  );
};

const ButtonCarouselNavi = ({ direction, className, ...props }) => {
  const modifers =
    direction === "next" ? ["rectangle"] : ["rectangle", "inverted"];
  return (
    <Button
      className={`${styles.carousel_navi} ${className}`}
      modifier={modifers}
      {...props}
    >
      <Icon
        className={`${direction === "next" ? styles.next : styles.back}`}
        name="arrow"
      />
    </Button>
  );
};

const ButtonEdit = ({ type, className, ...props }) => {
  return (
    <Button
      data-test={
        type === "save" ? "saveUserInfoButton" : "publishUserInfoButton"
      }
      type="submit"
      className={cx(className, styles.edit, styles[type])}
      {...props}
    >
      <>
        <p>{type === "save" ? "Vista" : "Birta"}</p>
        <Icon
          className={styles.icon}
          name={type === "save" ? "save" : "publish"}
        />
      </>
    </Button>
  );
};
const ButtonDelete = ({ className, ...props }) => {
  return (
    <Button
      type="button"
      data-test="deleteUser"
      className={cx(className, styles.delete)}
      {...props}
    >
      EYÐA NOTANDA
    </Button>
  );
};

const ButtonSearch = () => {
  return (
    <Button>
      <Icon className={styles.icon} name="search-large" />
    </Button>
  );
};

const ButtonHamburger = (props) => {
  return (
    <Button className={styles.hamburger} {...props}>
      <p />
      <p />
      <p />
    </Button>
  );
};

Button.Navigation = ButtonNavigation;
Button.CarouselNavi = ButtonCarouselNavi;
Button.Edit = ButtonEdit;
Button.Delete = ButtonDelete;
Button.Search = ButtonSearch;
Button.Hamburger = ButtonHamburger;

export default Button;
