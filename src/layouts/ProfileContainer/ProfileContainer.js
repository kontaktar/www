/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { CardsContainer, DragableCardContainer, ModalContent } from "layouts";
import { Button, Card, Icon, Modal } from "components";
import colors from "styles/colors.scss";
import mockUserData from "data/all-users-mock";
import styles from "./ProfileContainer.module.scss";

const ProfileContainer = ({ editMode, userName }) => {
  const wrapperElement = useRef(null);
  const [openModal, showModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState();
  const [showActiveSection, setShowActiveSection] = useState(false);
  const [activeExperiece, setActiveExperience] = useState(false);

  const [activeExperieceWidth, setActiveExperienceWidth] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      const WHITE_SPACE_WIDTH = 20;
      const CARD_WIDTH = 300;
      const cardsToShow = Math.floor(
        wrapperElement.current.clientWidth / (CARD_WIDTH + WHITE_SPACE_WIDTH)
      );
      setActiveExperienceWidth(
        CARD_WIDTH * cardsToShow + (cardsToShow - 1) * WHITE_SPACE_WIDTH
      );
    }
    if (wrapperElement.current) {
      handleResize();
    }

    // eslint-disable-next-line no-unused-expressions
    typeof window !== "undefined" &&
      window.addEventListener("resize", handleResize);
    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("resize", handleResize);
  }, [activeExperieceWidth]);

  // Store, GetUserExperience
  // Store, GetActiveUserExperince

  const [user] = mockUserData.filter((u) => u.userName === userName);

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

  const showActiveExperienceOnTop = (experience) => {
    setShowActiveSection(true);
    setActiveExperience(experience);
  };
  if (user) {
    return (
      <div
        ref={wrapperElement}
        className={!editMode ? styles.wrapper : undefined}
      >
        <div className={!editMode ? styles.title : styles.header}>
          <div className={styles.user_name}>
            <Icon
              className={styles.header_icon}
              color={colors.red}
              height="32"
              width="32"
              name="user"
            />
            <h2>
              {user.firstName} {user.lastName}
            </h2>
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
                {/* TODO: so that the comma inbetween is only shown if values on both sides are valid */}
                {user.address || ""}
                {user.address && user.city && `,`}
                {user.city || ""}
                {user.city &&
                  user.postalCode &&
                  user.postalCode !== "0" &&
                  `,`}{" "}
                {user.postalCode && user.postalCode !== "0"
                  ? user.postalCode
                  : ""}
              </span>
              <span>
                <Icon
                  className={styles.user_info_icons}
                  color={colors.red}
                  name="phone-profile"
                />
                {user.phoneNumber}
              </span>
            </Fragment>
            <Fragment>
              <span>
                <Icon
                  className={styles.user_info_icons}
                  color={colors.red}
                  name="email-profile"
                />
                {user.email}
              </span>
              {user.website ? (
                <span>
                  <Icon
                    className={styles.user_info_icons}
                    color={colors.red}
                    name="website"
                  />
                  {user.website}
                </span>
              ) : null}
            </Fragment>
          </div>
        </div>
        <div className={styles.active_card_container}>
          {showActiveSection && (
            <div className={styles.active_experience_wrapper}>
              <h3>Virkt verkspjald</h3>
              <div
                className={styles.active_experience_paper}
                style={{
                  width: activeExperieceWidth
                }}
              >
                <h5>{`${activeExperiece.title}`}</h5>
                <span
                  className={styles.full_description}
                >{`${activeExperiece.description}`}</span>
              </div>
            </div>
          )}
        </div>
        <div className={styles.card_container}>
          <h4>Verkspjöld</h4>
          {editMode ? (
            <DragableCardContainer
              items={user.experience}
              handleEdit={onOpenExperienceModal}
            />
          ) : (
            <CardsContainer className={styles.cards}>
              {user.experience.map((experience) => (
                <Card
                  description={experience.description}
                  editMode={editMode}
                  onEdit={onOpenExperienceModal}
                  title={experience.title}
                  months={experience.length.month}
                  years={experience.length.years}
                  onClick={() => showActiveExperienceOnTop(experience)}
                />
              ))}
              {/* TODO: "Add new card" Card} */}
            </CardsContainer>
          )}

          {/* if innerWidth < 800 => width = 100% */}
          <Modal
            open={openModal}
            onClose={onCloseModal}
            // height="600px"
            // width="800px"
          >
            <ModalContent {...modalType} data={modalData} />
          </Modal>
        </div>
      </div>
    );
  }
  return <p>No user?</p>;
};

export default ProfileContainer;

ProfileContainer.propTypes = {
  className: PropTypes.string
};
ProfileContainer.defaultProps = {
  className: ""
};
