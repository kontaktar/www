/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react";
import Link from "next/link";
import cx from "classnames";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import MuiCard from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Icon } from "components";
import { editUserExperience } from "store/actions";

import styles from "./Card.module.scss";

const Card = (props) => {
  const {
    experienceId,
    description,
    editMode = false,
    linkToProfile = "",
    months = "0",
    onClick,
    onEdit,
    published,
    title,
    style,
    years = "0"
  } = props;
  const dispatch = useDispatch();

  const store = useSelector((state) => state);

  const onEditCard = () => {
    onEdit(experienceId, title, description, years, months, published);
  };

  const onPublishToggleCard = () => {
    dispatch(
      editUserExperience(store.auth.user.id, {
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
    // do something
  };

  const LinkToProfile = ({ children }) => {
    if (linkToProfile) {
      return (
        <Link href="/user/[userName]" as={`/user/${linkToProfile}`}>
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
            >
              <Icon className={styles.button_icon} name="edit" />
            </button>
            <button
              type="button"
              className={cx(styles.button, styles.center, {
                [styles.center_secondary]: !published
              })}
              onClick={onPublishToggleCard}
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
            >
              <Icon className={styles.button_icon} name="delete" />
            </button>
          </div>
        )}

        <CardActionArea onClick={onClick} className={styles.card_area}>
          <CardContent className={styles.card_content}>
            {editMode && (
              <span
                className={cx(styles.publish_status, {
                  [styles.published]: published
                })}
              >
                {published ? "Í birtingu" : "Í geymslu"}
              </span>
            )}
            <span className={styles.title_description}>{title}</span>
            <span className={styles.description}>{description}</span>
            <span className={styles.length}>
              {((years && years !== "0") || (months && months !== "0")) && (
                <>
                  <Icon className={styles.clock_icon} name="clock" />
                  <span>{years && years !== "0" ? `${years} ár` : ""}</span>
                  <span>{months && months !== "0" ? `${months} mán` : ""}</span>
                </>
              )}
            </span>
          </CardContent>
        </CardActionArea>
      </MuiCard>
    </LinkToProfile>
  );
};

Card.propTypes = {
  // children: PropTypes.node.isRequired,
  description: PropTypes.string,
  linkToProfile: PropTypes.string
};

export default Card;