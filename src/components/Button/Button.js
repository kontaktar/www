/* eslint-disable react/prop-types */
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import cx from "classnames";
import { Icon } from "components";
import Link from "components/LinkWrap";
import styles from "./Button.module.scss";
import colors from "styles/colors.module.scss";

const Button = ({
  children,
  className = "",
  disabled,
  onClick,
  modifier,
  isLoading,
  type
}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={`${className} ${styles.button} ${modifier.map(
        (m) => ` ${styles[m]} `
      )}`}
      disabled={disabled}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
    >
      {isLoading ? <CircularProgress /> : <>{children}</>}
    </button>
  );
};

Button.Edit = ({ type, className, ...props }) => {
  return (
    <Button className={cx(className, styles.edit, styles[type])} {...props}>
      <p>{type === "save" ? "Vista" : "Birta"}</p>
      <Icon
        className={styles.icon}
        name={type === "save" ? "save" : "publish"}
      />
    </Button>
  );
};

Button.Navigation = ({
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
        <Icon
          color={colors.greyLight}
          className={styles.navigation_icon}
          name={icon}
        />
        <p>{title}</p>
      </Button>
    </Link>
  );
};

Button.Search = () => {
  return (
    <Button>
      <Icon className={styles.icon} name="search-large" />
    </Button>
  );
};

Button.CarouselNavi = ({ direction, className, ...props }) => {
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

Button.Hamburger = (props) => {
  return (
    <Button className={styles.hamburger} {...props}>
      <p />
      <p />
      <p />
    </Button>
  );
};

export default Button;

Button.propTypes = {
  /**
   * The buttons title
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
  /**
   * This will be used to create a description for this props in a propTable in storybook
   */
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  /**
   * Modifiers available: '', 'pill', 'inverted'.
   */
  modifier: PropTypes.arrayOf(
    PropTypes.oneOf(["", "pill", "inverted", "borderless", "rectangle"])
  ),
  type: PropTypes.string
};

Button.defaultProps = {
  isLoading: false,
  onClick: () => {},
  disabled: false,
  modifier: [""],
  type: "button"
};
