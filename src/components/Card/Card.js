/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react";
import Link from "next/link";

import PropTypes from "prop-types";
import MuiCard from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Icon } from "components";

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
    title,
    style,
    years = "0"
  } = props;

  const onEditCard = () => {
    onEdit(experienceId, title, description, years, months);
  };

  const LinkToProfile = ({ children }) => {
    if (linkToProfile) {
      return <Link href={`/user/${linkToProfile}`}>{children}</Link>;
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
              className={`${styles.button} ${styles.left}`}
              onClick={onEditCard}
            >
              <Icon className={styles.button_icon} name="edit" />
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.center}`}
            >
              <Icon className={styles.button_icon} name="save" />
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.right}`}
            >
              <Icon className={styles.button_icon} name="delete" />
            </button>
          </div>
        )}

        <CardActionArea onClick={onClick} className={styles.card_area}>
          <CardContent className={styles.card_content}>
            {/* <p>Í birtingu</p> */}
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
