/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import MuiCard from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import { Icon } from "components";
// import { minHeight } from "@material-ui/system";

import styles from "./Card.module.scss";

const Card = (props) => {
  const {
    description,
    editMode,
    months,
    shortDescription,
    style,
    years
  } = props;
  return (
    <MuiCard
      className={`${styles.card} ${editMode && styles.edit_mode}`}
      style={style}
    >
      <div className={styles.buttons}>
        <div className={styles.edit_button}></div>
        <div className={styles.save_button}></div>
        <div className={styles.delete_button}></div>
      </div>

      <CardActionArea className={styles.card_area}>
        <CardContent className={styles.card_content}>
          {/* <p>Í birtingu</p> */}
          <span className={styles.title_description}>{shortDescription}</span>
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
