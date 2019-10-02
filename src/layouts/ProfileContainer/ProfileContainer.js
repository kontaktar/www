import React from "react";
import PropTypes from "prop-types";
import styles from "./ProfileContainer.module.scss";

const ProfileContainer = () => {
  return (
    <div className={styles.profilecontainer}>
      <p>ProfileContainer</p>
      {/* 
        Heading
        CardsContainer fær lista af Cards fyrir þennan user
        - if CardContainer edit=true ? CardEdit : Card isEditable=true
        - CardEdit sýnir card með input fields.
        - isEditable sýnir edit logoin
        Endurnýta svo CardsContainer í SearchContainer
        Fara svo í að gera Drawer?
      */}
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
