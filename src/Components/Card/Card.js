/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import MuiCard from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Icon } from "components";
// import { minHeight } from "@material-ui/system";

import styles from "./Card.module.scss";

const Card = (props) => {
  const { description, editMode, months, title, style, years } = props;
  return (
    <MuiCard
      className={`${styles.card} ${editMode && styles.edit_mode}`}
      style={style}
    >
      <div className={styles.buttons}>
        <button type="button" className={`${styles.button} ${styles.left}`}>
          <Icon className={styles.button_icon} name="edit" />
        </button>
        <button type="button" className={`${styles.button} ${styles.center}`}>
          <Icon className={styles.button_icon} name="save" />
        </button>
        <button type="button" className={`${styles.button} ${styles.right}`}>
          <Icon className={styles.button_icon} name="delete" />
        </button>
      </div>

      <CardActionArea className={styles.card_area}>
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
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string
};

export default Card;
