import React from "react";
import PropTypes from "prop-types";
import styles from "./ProfileContainer.module.scss";

const ProfileContainer = () => {
  return (
    <div className={styles.profilecontainer}>
      <p>ProfileContainer</p>
    </div>
  );
};

export default ProfileContainer;

ProfileContainer.propTypes = {
  className: PropTypes.string
};
ProfileContainer.defaultProps = {
  className: ""
};