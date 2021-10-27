/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react";
import MuiCard from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import cx from "classnames";
import { deleteUserExperience, editUserExperience } from "store/actions";
import useUser from "lib/useUser";
import { Icon } from "components";
import Link from "components/LinkWrap";
import styles from "./Card.module.scss";

const Card = (props) => {
  const {
    id,
    experienceId,
    description,
    editMode = false,
    linkToProfile = undefined,
    months = "0",
    onClick,
    onEdit,
    published,
    title,
    style,
    years = "0"
  } = props;
  const dispatch = useDispatch();

  // TODO: This, onEditCard, onPublishToggleCard, onDeleteCard doesn't belong in the component.
  // Should be in a provider, this is breaking Storybook.
  const { user } = useUser();

  const onEditCard = () => {
    onEdit(experienceId, title, description, years, months, published);
  };

  const onPublishToggleCard = () => {
    dispatch(
      editUserExperience(user.details.id, {
        id: experienceId,
        title,
        description,
        years,
        months,
        published: !published
      })
    );
  };

  const onDeleteCard = () => {
    dispatch(deleteUserExperience(user.details.id, experienceId));
  };

  const LinkToProfile = ({ children }) => {
    if (linkToProfile) {
      return (
        <Link
          href={{
            pathname: "/[userName]",
            query: { experienceId: linkToProfile.experienceId }
          }}
          as={`/${linkToProfile.userName}?experienceId=${linkToProfile.experienceId}`}
        >
          {children}
        </Link>
      );
    }
    return children;
  };

  return (
    <LinkToProfile>
      <MuiCard
        className={`${styles.card} ${editMode && styles.edit_mode}`}
        style={style}
      >
        {editMode && (
          <div className={styles.buttons}>
            <button
              type="button"
              className={cx(styles.button, styles.left)}
              onClick={onEditCard}
              data-test={`experienceEditButton-Card${id}`}
            >
              <Icon className={styles.button_icon} name="edit" />
            </button>
            <button
              type="button"
              className={cx(styles.button, styles.center, {
                [styles.center_secondary]: !published
              })}
              onClick={onPublishToggleCard}
              data-test={`experiencePublishToggleButton-Card${id}`}
            >
              <Icon
                className={styles.button_icon}
                name={published ? "save" : "publish"}
              />
            </button>
            <button
              type="button"
              className={cx(styles.button, styles.right)}
              onClick={onDeleteCard}
              data-test={`experienceDeleteButton-Card${id}`}
            >
              <Icon className={styles.button_icon} name="delete" />
            </button>
          </div>
        )}

        <CardActionArea onClick={onClick}>
          <CardContent className={styles.card_content}>
            {editMode && (
              <span
                data-test={`publishStatus-Card${id}`}
                className={cx(styles.publish_status, {
                  [styles.published]: published
                })}
              >
                {published ? "Í birtingu" : "Í geymslu"}
              </span>
            )}
            <span
              className={styles.title_description}
              data-test={`experienceTitle-Card${id}`}
            >
              {title}
            </span>
            <span
              className={styles.description}
              data-test={`experienceDescription-Card${id}`}
            >
              {description}
            </span>
            <span className={styles.length}>
              {((years && years !== "0") || (months && months !== "0")) && (
                <>
                  <Icon className={styles.clock_icon} name="clock" />
                  <span data-test={`experienceYears-Card${id}`}>
                    {years && years !== "0" ? `${years} ár` : ""}
                  </span>
                  <span data-test={`experienceMonths-Card${id}`}>
                    {months && months !== "0" ? `${months} mán` : ""}
                  </span>
                </>
              )}
            </span>
          </CardContent>
        </CardActionArea>
      </MuiCard>
    </LinkToProfile>
  );
};

Card.Loader = () => {
  return (
    <MuiCard className={cx(styles.card, styles.loader)}>
      <CircularProgress />
    </MuiCard>
  );
};

Card.displayName = "Card";

export default Card;
