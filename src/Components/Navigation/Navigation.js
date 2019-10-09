import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import styles from "./Navigation.module.scss";

const routes = [
  {
    url: "/search",
    title: "Leit"
  },
  {
    url: "/profile",
    title: "Profile"
  },
  {
    url: "/",
    title: "Title"
  },
  {
    url: "/",
    title: "Title"
  },
  {
    url: "/",
    title: "Title"
  }
];

const Navigation = ({ isOpen }) => {
  return (
    <div className={styles.navigation_bar} id="navi">
      {routes.map((route) => (
        <Button.Navigation
          compact={!isOpen}
          title={route.title}
          url={route.url}
        />
      ))}
    </div>
  );
};

export default Navigation;

Navigation.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool
};
Navigation.defaultProps = {
  className: "",
  isOpen: false
};
