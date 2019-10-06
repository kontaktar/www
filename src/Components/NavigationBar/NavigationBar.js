import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import styles from "./NavigationBar.module.scss";

const NavigationBar = ({ isOpen = false }) => {
  return (
    <div className={styles.navigation_bar} id="navi">
      <Button.Navigation compact={!isOpen} />
      <Button.Navigation compact={!isOpen} />
      <Button.Navigation compact={!isOpen} />
      <Button.Navigation compact={!isOpen} />
    </div>
  );
};

export default NavigationBar;

NavigationBar.propTypes = {
  className: PropTypes.string
};
NavigationBar.defaultProps = {
  className: ""
};
