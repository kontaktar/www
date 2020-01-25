/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { CardsContainer } from "layouts";
import { Button, Card, Icon, Modal } from "components";
import colors from "styles/colors.scss";
import mockUserData from "data/all-users-mock";
import styles from "./ProfileContainer.module.scss";

const ProfileContainer = ({ editMode }) => {
  const [openModal, showModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const onCloseModal = () => {
    console.log("on close");
    showModal(false);
  };

  const onOpenModal = (title, description, years, months) => {
    setModalData({
      title,
      description,
      years,
      months
    });

    showModal(true);
  };

  const onSubmitChanges = () => {
    console.log("breyta takki");
  };

  const mockUser = mockUserData[2];

  return (
    <div className={!editMode ? styles.wrapper : undefined}>
      <div className={!editMode ? styles.title : styles.header}>
        <div className={styles.user_name}>
          <Icon
            className={styles.header_icon}
            color={colors.red}
            height="32"
            width="32"
            name="user"
          />
          <h2>{mockUser.name}</h2>
          {editMode && <Button onClick={onSubmitChanges}>Breyta</Button>}
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
          {mockUser.experience.map((experience) => (
            <Card
              description={experience.description}
              editMode={editMode}
              onEdit={onOpenModal}
              title={experience.title}
              months={experience.length.month}
              years={experience.length.years}
            />
          ))}
          {/* <Card static /> */}
          <Modal
            open={openModal}
            onClose={onCloseModal}
            height="300px"
            width="300px"
          >
            <div>
              <p>{modalData.title}</p>
              <p>{modalData.description}</p>
              <p>{modalData.years}</p>
              <p>{modalData.months}</p>
            </div>
          </Modal>
        </CardsContainer>
      </div>
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
