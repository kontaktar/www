import React from "react";
import PropTypes from "prop-types";
import styles from "./UserProfile.module.scss";

const UserProfile = () => {
  return (
    <div className={styles.userprofile}>
      <p>UserProfile</p>
    </div>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  className: PropTypes.string
};
UserProfile.defaultProps = {
  className: ""
};
