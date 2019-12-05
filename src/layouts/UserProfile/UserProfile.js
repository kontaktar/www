import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "components";
import styles from "./UserProfile.module.scss";

const UserProfile = () => {
  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.user_name}>
          <h2>Hugrún Rúnarsdóttir</h2>
          <Button>Breyta</Button>
        </div>
        <div className={styles.user_information}>
          <div>
            <span>Reykjavík, Iceland</span>
            <span>+354 868 4088</span>
          </div>
          <div>
            <span>hugrun@gmail.com</span>
            <span>hugrunrunars.com</span>
          </div>
        </div>
      </div>
      <div className={styles.card_container}>
        <h3>Verkspjöld</h3>
        <div className={styles.cards}>
          <Card />
          <Card />
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  className: PropTypes.string
};
UserProfile.defaultProps = {
  className: ""
};
