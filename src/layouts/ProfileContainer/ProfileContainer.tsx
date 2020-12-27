/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useEffect, useRef, useState } from "react";
import orderBy from "lodash.orderby";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserExperiences, getUserByUserName } from "store/actions";
import useAuth from "hooks/useAuth";
import { Button, Card, Icon, Modal } from "components";
import NewModal from "components/Modal/NewModal";
import { CardsContainer, DragableCardContainer, ModalContent } from "layouts";
import styles from "./ProfileContainer.module.scss";
import colors from "styles/colors.module.scss";

const ProfileContainer = ({ editMode, userName }) => {
  const { query } = useRouter();

  const { userData } = useAuth();
  const wrapperElement = useRef(null);
  const [openModal, showModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState<any>();
  const [user, setUserProfile] = useState<any>();
  const [showActiveSection, setShowActiveSection] = useState(false);
  const [activeExperience, setActiveExperience] = useState<any>();
  const [userExperiences, setUserExperiences] = useState([]);

  const [activeExperienceWidth, setActiveExperienceWidth] = useState(undefined);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editMode && userData?.id) {
      dispatch(fetchUserExperiences(userData.id));
      setUserProfile(userData);
    }
  }, [dispatch, editMode, userData]);

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
        !user &&
        Object.entries(store.users).length > 0 &&
        !store.users.isFetching
      ) {
        const [currentUserProfile]: any = Object.values(store.users).filter(
          (u: any) => u && u?.userName && u?.userName === userName
        );

        if (currentUserProfile) {
          setUserProfile(currentUserProfile);
          dispatch(fetchUserExperiences(currentUserProfile.id));
        }
      }
    }
  }, [userName, store.users, editMode, user, dispatch]);

  // Fetch profile for logged in user
  useEffect(() => {
    if (editMode && userData && userData.id && store.users) {
      setUserProfile(userData);
    }
  }, [editMode, store.users, userData]);

  useEffect(() => {
    if (
      store.users &&
      user &&
      user?.id &&
      store.experiences &&
      store.experiences.byUserId &&
      store.experiences.byUserId[user?.id] &&
      !store.experiences.isFetching
    ) {
      setUserExperiences(
        orderBy(store.experiences.byUserId[user?.id], ["order"], ["asc"])
      );
    }
  }, [store.experiences, store.users, user]);

  const onCloseModal = () => {
    showModal(false);
  };

  const onOpenExperienceModal = (
    id,
    title,
    description,
    years,
    months,
    published
  ) => {
    showModal(true);
    setModalData({
      id,
      title,
      description,
      years,
      months,
      published
    });
    setModalType({ experience: true });
  };

  const onEditUserInfoModal = () => {
    // TODO: This is slow and sometimes failes on pushing 'breyta upplýsingum'
    if (userData && userData.id) {
      setModalData({ ...userData });
      setModalType({ userInformation: true });
      showModal(true);
    }
  };

  const showActiveExperienceOnTop = (experience) => {
    setShowActiveSection(true);
    setActiveExperience(experience);
  };

  if (query?.experienceId && !showActiveSection) {
    const experience = userExperiences.filter(
      // eslint-disable-next-line radix
      (ex) => ex.id === parseInt(query?.experienceId as string)
    );
    if (experience[0]) {
      setShowActiveSection(true);
      setActiveExperience(experience[0]);
    }
  }

  if (user) {
    return (
      <div
        ref={wrapperElement}
        className={!editMode ? styles.wrapper : styles.edit_wrapper}
      >
        <div className={!editMode ? styles.title : styles.header}>
          <div className={styles.first_row}>
            <div className={styles.user}>
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
            </div>
            {editMode && <Button onClick={onEditUserInfoModal}>Breyta</Button>}
            {!editMode && userName === userData?.userName && (
              <Link href="/profile">
                <Button>Breyta</Button>
              </Link>
            )}
          </div>

          <div className={styles.user_information}>
            <Fragment>
              <span>
                <Icon
                  className={styles.user_info_icons}
                  color={colors.red}
                  name="phone-profile"
                />
                {user.phoneNumber}
              </span>
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
                <h5>{`${activeExperience?.title}`}</h5>
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
            </>
          ) : (
            <CardsContainer className={styles.cards}>
              {userExperiences &&
                userExperiences.map((experience) => {
                  if (experience.published) {
                    return (
                      <Card
                        description={experience.description}
                        editMode={!!editMode}
                        experienceId={experience.id}
                        onEdit={onOpenExperienceModal}
                        published={experience.published}
                        title={experience.title}
                        months={experience.month}
                        years={experience.years}
                        onClick={() => showActiveExperienceOnTop(experience)}
                      />
                    );
                  }
                  return null;
                })}
            </CardsContainer>
          )}

          {/* if innerWidth < 800 => width = 100% */}
          {/* <Modal
            open={openModal}
            onClose={onCloseModal}
            {...modalType}
            // height="600px"
            // width="800px"
          >
            <ModalContent {...modalType} data={modalData} /> */}
          {/* </Modal> */}
          <NewModal open={openModal} onClose={onCloseModal}>
            <ModalContent {...modalType} data={modalData} />
          </NewModal>
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
