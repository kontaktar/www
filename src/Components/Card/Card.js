/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import MuiCard from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
// import { minHeight } from "@material-ui/system";

import styles from "./Card.module.scss";

const Card = (props) => {
  const { description, name, style } = props;
  return (
    <MuiCard className={styles.card} style={style}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography
            className={styles.title}
            color="textSecondary"
            gutterBottom
          >
            {description}
          </Typography>
          <PhoneIcon />
          <EmailIcon />
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
