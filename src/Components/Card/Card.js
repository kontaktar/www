import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import { minHeight } from "@material-ui/system";

// import styles from "./Card.module.scss";

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    minHeight: 300
  }
});

export const CardWrapper = (props) => {
  const { children } = props;
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  return (
    // <div className={styles.card} {...props}>
    //   {children}
    // </div>
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            Ég geri vefi í React með Next.js og hef áhuga á bjálkakeðjum.
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Einar Alexander Eymundsson
          </Typography>
          <PhoneIcon />
          <EmailIcon />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CardWrapper.propTypes = {
  children: PropTypes.node.isRequired
};
// const CardContentWrapper = (props) => {
//   let { paragraph, signature } = props;
//   if (paragraph.length > 300) {
//     paragraph = `${paragraph.slice(0, 300)} ...`;
//   }
//   if (signature.length > 100) {
//     signature = `${signature.slice(0, 100)}`;
//   }

//   return (
//     <CardWrapper className={styles.card_content}>
//       <span className={styles.signature}>
//         <span className={styles.icon} />
//         {signature}
//       </span>
//       <span className={styles.paragraph}>{paragraph}</span>
//     </CardWrapper>
//   );
// };

// CardContent.propTypes = {
//   paragraph: PropTypes.string.isRequired,
//   signature: PropTypes.string.isRequired
// };

export { CardWrapper as Card };
// export { Card, CardContent };
// Card.propTypes = {}
// Card.defaultProps = {}
