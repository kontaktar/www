import React from "react";
import PropTypes from "prop-types";
import useAuth from "hooks/useAuth.tsx";
import Button from "../Button";
import styles from "./Navigation.module.scss";

const routes = [
  {
    url: "/profill",
    title: "Þinn prófíll",
    icon: "user"
  },
  {
    url: "/leit",
    title: "Leit",
    icon: "search"
  },
  {
    url: "/",
    title: "Útskrá",
    icon: "lock"
  }
];

const Navigation = ({ isOpen }) => {
  const { logout } = useAuth();

  return (
    <div className={styles.navigation_bar} id="navi">
      {routes.map((route) => (
        <Button.Navigation
          icon={route.icon}
          key={route.title}
          compact={!isOpen}
          title={route.title}
          url={route.url || "/"}
          onClick={route.title === "Útskrá" ? () => logout() : () => {}}
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
