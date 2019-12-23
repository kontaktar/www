/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { CardsContainer } from "layouts";
import { Button, Card, Icon, Modal } from "components";
import colors from "styles/colors.scss";
import styles from "./ProfileContainer.module.scss";

const ProfileContainer = () => {
  const [openModal, showModal] = useState(false);

  // TODO
  const editMode = true;

  const onClose = () => {
    showModal(false);
  };

  const onOpen = () => {
    showModal(true);
  };
  return (
    <Fragment>
      <Modal open={openModal} onClose={onClose} height="300px" width="300px">
        <div>
          <p>ksda</p>
        </div>
      </Modal>
      <div className={styles.header}>
        <div className={styles.user_name}>
          <Icon
            className={styles.header_icon}
            color={colors.red}
            height="32"
            width="32"
            name="user"
          />
          <h2>Hugrún Rúnarsdóttir</h2>
          {editMode && <Button onClick={onOpen}>Breyta</Button>}
        </div>
        <div className={styles.user_information}>
          <Fragment>
            <span>
              <Icon
                className={styles.user_info_icons}
                color={colors.red}
                name="location"
              />
              Reykjavík, Iceland
            </span>
            <span>
              <Icon
                className={styles.user_info_icons}
                color={colors.red}
                name="phone-profile"
              />
              +354 868 4088
            </span>
          </Fragment>
          <Fragment>
            <span>
              <Icon
                className={styles.user_info_icons}
                color={colors.red}
                name="email-profile"
              />
              hugrun@gmail.com
            </span>
            <span>
              <Icon
                className={styles.user_info_icons}
                color={colors.red}
                name="website"
              />
              hugrunrunars.com
            </span>
          </Fragment>
        </div>
      </div>
      <div className={styles.card_container}>
        <h3>Verkspjöld</h3>
        <CardsContainer className={styles.cards}>
          <Card
            editMode={editMode}
            title="test"
            description="yo"
            years="2"
            months="12"
          />
          <Card
            editMode={editMode}
            title="test"
            description="yo"
            years="2"
            months="12"
          />
          <Card
            editMode={editMode}
            title="test"
            description="yo"
            years="2"
            months="12"
          />
          <Card static />
        </CardsContainer>
      </div>
    </Fragment>
  );
};

export default ProfileContainer;

ProfileContainer.propTypes = {
  className: PropTypes.string
};
ProfileContainer.defaultProps = {
  className: ""
};
