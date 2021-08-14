import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState
} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import orderBy from "lodash.orderby";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserExperiences } from "store/actions";
import useUser from "lib/useUser";
import { debugError } from "helpers/debug";
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

  const store = useSelector((state) => state);
  const experiences = useSelector((state) => state.experiences);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(experiences.isFetching);
  }, [experiences]);

  useEffect(() => {
    if (editMode && user?.details?.id) {
      try {
        dispatch(fetchUserExperiences(user?.details.id));
      } catch (error) {
        debugError(error);
      }
      setUserProfile(user?.details);
    }
  }, [dispatch, editMode, user, user?.details]);

  // Fetch user profile
  useEffect(() => {
    if (!editMode && userName) {
      if (
        !userProfile &&
        Object.entries(store.users).length > 0 &&
        !store.users.isFetching
      ) {
        // TODO: type
        const [currentUserProfile]: any = Object.values(store.users).filter(
          (u: any) => u && u?.userName && u?.userName === userName
        );

        if (currentUserProfile) {
          setUserProfile(currentUserProfile);
          try {
            dispatch(fetchUserExperiences(currentUserProfile.id));
          } catch (error) {
            debugError(error);
          }
        }
      }
    }
  }, [userName, store.users, editMode, userProfile, dispatch]);

  useEffect(() => {
    if (
      store.users &&
      userProfile &&
      userProfile?.id &&
      store.experiences &&
      store.experiences.byUserId &&
      store.experiences.byUserId[userProfile?.id] &&
      !store.experiences.isFetching
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
              <UserInfoItem item={userProfile.phoneNumber} name="phoneNumber" />
              <UserInfoItem item={userProfile.email} name="email" />
              <UserInfoItem item={userProfile.website} name="website" />
              <UserInfoItem
                item={[
                  userProfile.streetName,
                  userProfile.postalCode && userProfile.postalCode !== "0"
                    ? userProfile.postalCode
                    : "",
                  userProfile.city,
                  userProfile.country
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
              ariaLabel="Valið verkpsjald"
              modalKey={activeExperience?.id}
              open={showActiveSection}
              onClose={() => {
                setShowActiveSection(false);
              }}
              overlayClassName={styles.active_experience_modal}
            >
              <div
                key={activeExperience?.id}
                className={styles.active_experience_wrapper}
              >
                <h3>Valið verkspjald</h3>
                <div className={styles.active_experience_paper}>
                  <h5>{`${activeExperience?.title}`}</h5>
                  <span
                    className={styles.full_description}
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
