/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import SvgUser from "assets/icons/SvgUser";
import SvgSearch from "assets/icons/SvgSearch";
import SvgClose from "assets/icons/SvgClose";
import SvgPhone from "assets/icons/SvgPhone";
import SvgEmail from "assets/icons/SvgEmail";
import SvgArrow from "assets/icons/SvgArrow";
import styles from "./Icon.module.scss";

// TODO: This setup is disgusting... + add fill props for icons
const Icon = ({ className, name }) => {
  return (
    <div className={`${className} ${styles.icon}`}>
      {name === "user-profile" && <SvgUser />}
      {name === "search" && <SvgSearch />}
      {name === "close" && <SvgClose />}
      {name === "phone" && <SvgPhone />}
      {name === "email" && <SvgEmail />}
      {name === "arrow" && <SvgArrow />}
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
