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
    description,
    editMode = false,
    linkToProfile = false,
    months,
    onClick,
    onEdit,
    title,
    style,
    years
  } = props;

  const onEditCard = () => {
    onEdit(title, description, years, months);
  };

  const LinkToProfile = ({ children }) => {
    // TODO replace hardcoded Link
    if (linkToProfile) {
      return <Link href="/user/einar">{children}</Link>;
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

            {(years || months) && (
              <span className={styles.length}>
                <Icon className={styles.clock_icon} name="clock" />
                <span>{years ? `${years} ár` : ""}</span>
                <span>{months ? `${months} mán` : ""}</span>
              </span>
            )}
          </CardContent>
        </CardActionArea>
      </MuiCard>
    </LinkToProfile>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  linkToProfile: PropTypes.bool
};

export default Card;
