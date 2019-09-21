import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MuiCard from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
// import { minHeight } from "@material-ui/system";

// import styles from "./Card.module.scss";

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    minHeight: 300
  }
});

export const Card = (props) => {
  // const { children } = props;
  const { description, name, style } = props;
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  return (
    // <div className={styles.card} {...props}>
    //   {children}
    // </div>
    <MuiCard className={classes.card} style={style}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography
            className={classes.title}
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
