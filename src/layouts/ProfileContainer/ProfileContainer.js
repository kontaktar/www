/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { CardsContainer, ModalContent } from "layouts";
import { Button, Card, Icon, Modal } from "components";
import colors from "styles/colors.scss";
import mockUserData from "data/all-users-mock";
import styles from "./ProfileContainer.module.scss";

const ProfileContainer = ({ editMode }) => {
  const [openModal, showModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState();
  const [showActiveSection, setShowActiveSection] = useState(false);
  const [activeExperiece, setActiveExperience] = useState(false);

  // Store, GetUserExperience
  // Store, GetActiveUserExperince

  // TODO: Remove hardcoded
  // const activeUserExperience = mockUserData[2].experience[0];
  const user = mockUserData[2];

  const onCloseModal = () => {
    showModal(false);
  };

  const onOpenExperienceModal = (title, description, years, months) => {
    setModalData({
      title,
      description,
      years,
      months
    });
    setModalType({ experience: true });
    showModal(true);
  };

  const onEditUserInfoModal = () => {
    setModalData({ title: "Breyta upplýsingum " });
    setModalType({ userInformation: true });
    showModal(true);
  };

  const showOnTop = (experience) => {
    setShowActiveSection(true);
    setActiveExperience(experience);
  };
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
          <h2>{user.name}</h2>
          {editMode && <Button onClick={onEditUserInfoModal}>Breyta</Button>}
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
      <>
        {showActiveSection && (
          <div className={styles.active_experience_wrapper}>
            <h3>Virkt verkspjald</h3>
            <div className={styles.active_experience_paper}>
              <h5>{`${activeExperiece.title}`}</h5>
              <span
                className={styles.full_description}
              >{`${activeExperiece.description}`}</span>
            </div>
          </div>
        )}
      </>
      <div className={styles.card_container}>
        <h4>Verkspjöld</h4>
        <CardsContainer className={styles.cards}>
          {user.experience.map((experience) => (
            <Card
              description={experience.description}
              editMode={editMode}
              onEdit={onOpenExperienceModal}
              title={experience.title}
              months={experience.length.month}
              years={experience.length.years}
              onClick={() => showOnTop(experience)}
              // onClick={() => console.log("yolos")}
            />
          ))}
          {/* <Card static /> */}
          {/* if innerWidth < 800 => width = 100% */}
          <Modal
            open={openModal}
            onClose={onCloseModal}
            // height="600px"
            // width="800px"
          >
            <ModalContent {...modalType} data={modalData} />
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
