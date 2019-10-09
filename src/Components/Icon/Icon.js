/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import SvgUser from "assets/icons/SvgUser";
import SvgSearch from "assets/icons/SvgSearch";
import SvgClose from "assets/icons/SvgClose";
import styles from "./Icon.module.scss";

const Icon = ({ className, name }) => {
  return (
    <div className={`${className} ${styles.icon}`}>
      {name === "user-profile" && <SvgUser />}
      {name === "search" && <SvgSearch />}
      {name === "close" && <SvgClose />}
    </div>
  );
};

export default Icon;

Icon.propTypes = {
  className: PropTypes.string
};
Icon.defaultProps = {
  className: ""
};
