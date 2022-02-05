import React, { ReactElement, useEffect, useRef, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import orderBy from "lodash.orderby";
import { useUser } from "providers/AuthorizedUser";
import { useRouter } from "next/router";
import { DatabaseUser } from "types";
import { useAppDispatch, useAppSelector } from "store";
import type { AppState, AppStore } from "store/configureStore";
import { fetchUserExperiences } from "store/experiences";
import { fetchAuthorizedUser } from "store/users";
import { debug, debugError } from "helpers/debug";
import useAuth from "hooks/useAuth";
import { Button, Card, Icon } from "components";
import Link from "components/LinkWrap";
import Modal from "components/Modal";
import UserInfoItem from "components/Profile/UserInfoItem";
import { CardsContainer, DragableCardContainer, ModalContent } from "layouts";
import styles from "./ProfileContainer.module.scss";
import colors from "styles/colors.module.scss";

type Props = {
  editMode?: boolean;
  userName?: string;
};

const ProfileContainer = ({
  editMode = false,
  userName = undefined
}: Props): ReactElement => {
  const { query } = useRouter();

  const { logout } = useAuth();
  const { user } = useUser();
  const wrapperElement = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState<any>();
  const [userProfile, setUserProfile] = useState<any>();
  const [showActiveSection, setShowActiveSection] = useState(false);
  const [activeExperience, setActiveExperience] = useState<any>();
  const [userExperiences, setUserExperiences] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const store = useAppSelector((state) => state);
  const experiences = useAppSelector((state) => (state as any).experiences);

  const users = useAppSelector((state) => (state as any).users.byId);

  const profileUser: DatabaseUser = userName
    ? Object.values(users).filter(
        (u: DatabaseUser) => u.userName == userName
      )[0]
    : undefined;

  const currentUser = useAppSelector(
    (state) => (state as any).users?.byId?.[user?.details?.id]
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && !user?.details?.id) {
      if (user?.details?.createdAt && user?.details?.phoneNumber) {
        // user was just created.
        setUserProfile(user?.details);
        // does this not run on user creation!?!?
        debugError("USER CREATED !?", user);
      } else if (user.isLoggedIn) {
        console.log("will logout", user);
        logout();
      }
    } else if (user?.details?.id) {
      dispatch(fetchAuthorizedUser(user?.details.id));
      if (!store?.experiences?.byUserId?.[user.details.id]) {
        dispatch(fetchUserExperiences(user?.details.id));
      }
    }
  }, [user]);
  useEffect(() => {
    if (editMode) {
      setUserProfile(currentUser);
    } else {
      setUserProfile(profileUser);
      if (!store?.experiences?.byUserId?.[profileUser.id]) {
        dispatch(fetchUserExperiences(profileUser.id));
      }
    }
  }, [editMode, currentUser, profileUser]);

  // TODO: Revisit this:
  useEffect(() => {
    if (
      store.users &&
      userProfile &&
      userProfile?.id &&
      store.experiences &&
      store.experiences.byUserId &&
      store.experiences.byUserId[userProfile?.id]
    ) {
      setUserExperiences(
        orderBy(store.experiences.byUserId[userProfile?.id], ["order"], ["asc"])
      );
    }
  }, [store.experiences, store.users, userProfile]);

  const onOpenExperienceModal = (
    id,
    title,
    description,
    years,
    months,
    published
  ) => {
    setOpenModal(true);
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
    if (user?.details && user?.details.id) {
      setModalData({ ...user?.details });
      setModalType({ userInformation: true });
      setOpenModal(true);
    }
  };

  const showActiveExperienceOnTop = (experience) => {
    setShowActiveSection(true);
    setActiveExperience(experience);
  };

  if (query?.experienceId && !showActiveSection && !activeExperience) {
    const experience = userExperiences.filter(
      // eslint-disable-next-line radix
      (ex) => ex.id === parseInt(query?.experienceId as string)
    );
    if (experience[0]) {
      setShowActiveSection(true);
      setActiveExperience(experience[0]);
    }
  }

  if (userProfile) {
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
              <h2 data-test="fullNameHeading">
                {userProfile.firstName} {userProfile.lastName}
              </h2>
            </div>

            {editMode && (
              <Button
                data-test="changeUserButton"
                className={styles.change_user_btn}
                onClick={onEditUserInfoModal}
              >
                Breyta
              </Button>
            )}
            {!editMode && userName === user?.details?.userName && (
              <Link href="/profill">
                <Button data-test="goToProfileButton">Breyta</Button>
              </Link>
            )}
          </div>

          <div className={styles.user_information}>
            <>
              <UserInfoItem
                item={userProfile.userPhoneNumber.phoneNumber}
                name="phoneNumber"
              />
              <UserInfoItem
                item={userProfile.userMetaData?.email}
                name="email"
              />
              <UserInfoItem
                item={userProfile.userMetaData?.website}
                name="website"
              />
              <UserInfoItem
                item={[
                  userProfile.userAddress?.streetName,
                  userProfile.userAddress?.postalCode &&
                  userProfile.userAddress?.postalCode !== "0"
                    ? userProfile.userAddress?.postalCode
                    : "",
                  userProfile.userAddress?.city,
                  userProfile.userAddress?.country
                ]
                  .filter(Boolean)
                  .join(", ")}
                name="location"
              />
            </>
          </div>
        </div>
        <div className={styles.card_container}>
          <h4>Verkspjöld</h4>
          {isLoading && <CardsContainer isLoading />}
          {editMode && !isLoading ? (
            <>
              {userExperiences.length > 0 ? (
                <DragableCardContainer
                  userId={userProfile.id}
                  items={userExperiences}
                  handleEdit={onOpenExperienceModal}
                />
              ) : (
                <CardsContainer addNewItemButton />
              )}
            </>
          ) : (
            <CardsContainer>
              {userExperiences.length > 0 &&
                userExperiences.map((experience, i) => {
                  if (experience.published) {
                    return (
                      <Card
                        id={i}
                        key={experience.id}
                        description={experience.description}
                        editMode={!!editMode}
                        experienceId={experience.id}
                        onEdit={onOpenExperienceModal}
                        published={experience.published}
                        title={experience.title}
                        months={experience.month}
                        years={experience.years}
                        onClick={() => {
                          showActiveExperienceOnTop(experience);
                        }}
                      />
                    );
                  }
                  return null;
                })}
            </CardsContainer>
          )}
          {activeExperience && showActiveSection && (
            <Modal
              ariaLabel="Valið verkspjald"
              modalKey={activeExperience?.id}
              open={showActiveSection}
              onClose={() => {
                setShowActiveSection(false);
              }}
              overlayClassName={styles.active_experience_modal}
            >
              <h3>Valið verkspjald</h3>
              <hr />
              <div className={styles.active_experience_wrapper}>
                <div className={styles.active_experience_paper}>
                  <h5>{`${activeExperience?.title}`}</h5>
                  <span
                    className={styles.description}
                  >{`${activeExperience?.description}`}</span>
                </div>
              </div>
            </Modal>
          )}
          {openModal && (
            <Modal
              ariaLabel={
                modalType?.experience
                  ? "Breyta verkspjaldi"
                  : "Breyta persónulegum upplýsingum"
              }
              open={openModal}
              onClose={() => setOpenModal(false)}
            >
              <ModalContent {...modalType} data={modalData} />
            </Modal>
          )}
        </div>
      </div>
    );
  }
  return <CircularProgress />;
};

export default ProfileContainer;
