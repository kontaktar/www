/* eslint-disable react/prop-types */
import React from "react";
import SvgArrow from "assets/icons/SvgArrow";
import SvgClock from "assets/icons/SvgClock";
import SvgClose from "assets/icons/SvgClose";
import SvgDelete from "assets/icons/SvgDelete";
import SvgEdit from "assets/icons/SvgEdit";
import SvgEmail from "assets/icons/SvgEmail";
import SvgEmailProfile from "assets/icons/SvgEmailProfile";
import SvgLocation from "assets/icons/SvgLocation";
import SvgLock from "assets/icons/SvgLock";
import SvgPhone from "assets/icons/SvgPhone";
import SvgPhoneProfile from "assets/icons/SvgPhoneProfile";
import SvgPublish from "assets/icons/SvgPublish";
import SvgSave from "assets/icons/SvgSave";
import SvgSearch from "assets/icons/SvgSearch";
import SvgSearchLarge from "assets/icons/SvgSearchLarge";
import SvgUser from "assets/icons/SvgUser";
import SvgWebsite from "assets/icons/SvgWebsite";
import PropTypes from "prop-types";
import styles from "./Icon.module.scss";

// TODO: This setup is disgusting... + add fill props for icons
const Icon = ({ className, name, ...props }) => {
  // console.log(className);
  return (
    <div className={`${className} ${styles.icon}`}>
      {name === "user" && <SvgUser {...props} />}
      {name === "search" && <SvgSearch {...props} />}
      {name === "search-large" && <SvgSearchLarge {...props} />}
      {name === "close" && <SvgClose {...props} />}
      {name === "phone" && <SvgPhone {...props} />}
      {name === "email" && <SvgEmail {...props} />}
      {name === "lock" && <SvgLock {...props} />}
      {name === "arrow" && <SvgArrow {...props} />}
      {name === "clock" && <SvgClock {...props} />}
      {name === "delete" && <SvgDelete {...props} />}
      {name === "edit" && <SvgEdit {...props} />}
      {name === "save" && <SvgSave {...props} />}
      {name === "phone-profile" && <SvgPhoneProfile {...props} />}
      {name === "email-profile" && <SvgEmailProfile {...props} />}
      {name === "publish" && <SvgPublish {...props} />}
      {name === "location" && <SvgLocation {...props} />}
      {name === "website" && <SvgWebsite {...props} />}
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
