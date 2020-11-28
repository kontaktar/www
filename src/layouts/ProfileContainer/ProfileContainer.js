/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useEffect, useRef, useState } from "react";
import orderBy from "lodash.orderby";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserExperiences, getUserByUserName } from "store/actions";
import { Button, Card, Icon, Modal } from "components";
import { CardsContainer, DragableCardContainer, ModalContent } from "layouts";
import styles from "./ProfileContainer.module.scss";
import colors from "styles/colors.module.scss";

const ProfileContainer = ({ editMode, userName }) => {
  const wrapperElement = useRef(null);
  const [openModal, showModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState();
  const [user, setUserProfile] = useState({});
  const [showActiveSection, setShowActiveSection] = useState(false);
  const [activeExperience, setActiveExperience] = useState(false);
  const [userExperiences, setUserExperiences] = useState([]);

  const [activeExperienceWidth, setActiveExperienceWidth] = useState(undefined);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

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
  }, [activeExperienceWidth]);

  // Fetch user profile
  useEffect(() => {
    if (!editMode && userName) {
      if (
        Object.entries(user).length === 0 &&
        Object.entries(store.users).length > 0 &&
        !store.users.isFetching
      ) {
        const [currentUserProfile] = Object.values(store.users).filter(
          (u) => u && u.userName && u.userName === userName
        );

        if (currentUserProfile) {
          setUserProfile(currentUserProfile);
          dispatch(fetchUserExperiences(currentUserProfile.id));
        }
      }
    }
  }, [userName, store.users]);

  // Fetch logged in user
  useEffect(() => {
    if (
      editMode &&
      store.auth &&
      store.auth.user &&
      store.auth.user.id &&
      store.users &&
      store.users[store.auth.user.id]
    ) {
      dispatch(fetchUserExperiences(store.auth.user.id));
      setUserProfile(store.users[store.auth.user.id]);
    }
  }, [store.users && store.auth && store.auth.user]);

  // Fetch profile for logged in user
  useEffect(() => {
    if (
      editMode &&
      store.auth &&
      store.auth.user &&
      store.auth.user.id &&
      store.users
    ) {
      setUserProfile(store.users[store.auth.user.id]);
    }
  }, [store.users]);

  useEffect(() => {
    if (
      store.users &&
      user.id &&
      store.experiences &&
      store.experiences.byUserId &&
      store.experiences.byUserId[user.id] &&
      !store.experiences.isFetching
    ) {
      console.log(
        "useEffect: ProfileContainer [store.experiences]",
        store.experiences
      );
      setUserExperiences(
        orderBy(store.experiences.byUserId[user.id], ["order"], ["asc"])
      );
    }
  }, [store.experiences]);

  const onCloseModal = () => {
    showModal(false);
  };

  const onOpenNewExperienceModal = () => {
    setModalData({});
    setModalType({ experience: true });
    showModal(true);
  };

  const onOpenExperienceModal = (
    id,
    title,
    description,
    years,
    months,
    published
  ) => {
    setModalData({
      id,
      title,
      description,
      years,
      months,
      published
    });
    setModalType({ experience: true });
    showModal(true);
  };

  const onEditUserInfoModal = () => {
    // TODO: This is slow and sometimes failes on pushing 'breyta upplýsingum'
    setModalData({ ...store.users[store.auth.user.id] });
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
        className={!editMode ? styles.wrapper : styles.edit_wrapper}
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
                {[
                  user.streetName,
                  user.postalCode && user.postalCode !== "0"
                    ? user.postalCode
                    : "",
                  user.city,
                  user.country
                ]
                  .filter(Boolean)
                  .join(", ")}
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
                  width: activeExperienceWidth
                }}
              >
                <h5>{`${activeExperience.title}`}</h5>
                <span
                  className={styles.full_description}
                >{`${activeExperience.description}`}</span>
              </div>
            </div>
          )}
        </div>
        <div className={styles.card_container}>
          <h4>Verkspjöld</h4>
          {editMode ? (
            <>
              {userExperiences && (
                <DragableCardContainer
                  userId={user.id}
                  items={userExperiences}
                  handleEdit={onOpenExperienceModal}
                />
              )}
              <CardsContainer className={styles.cards}>
                <button
                  type="button"
                  className={styles.add_new_experience}
                  onClick={onOpenNewExperienceModal}
                >
                  <span className={styles.add_new_plus}>+</span>
                </button>
              </CardsContainer>
            </>
          ) : (
            <CardsContainer className={styles.cards}>
              {userExperiences &&
                userExperiences.map((experience) => {
                  return (
                    <Card
                      description={experience.description}
                      editMode={editMode}
                      experienceId={experience.id}
                      onEdit={onOpenExperienceModal}
                      published={experience.published}
                      title={experience.title}
                      months={experience.month}
                      years={experience.years}
                      onClick={() => showActiveExperienceOnTop(experience)}
                    />
                  );
                })}
            </CardsContainer>
          )}

          {/* if innerWidth < 800 => width = 100% */}
          <Modal
            open={openModal}
            onClose={onCloseModal}
            {...modalType}
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
  className: PropTypes.string,
  userName: PropTypes.string
};
ProfileContainer.defaultProps = {
  className: "",
  userName: undefined
};
