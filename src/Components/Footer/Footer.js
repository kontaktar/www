import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import styles from "./Footer.module.scss";

const Footer = ({ className }) => {
  return (
    <div className={`${styles.footer} ${className}`}>
      <p>Footer</p>
      <Card className={styles.card}>
        <CardContent>
          <p>pen</p>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Footer;

Footer.propTypes = {
  className: PropTypes.string
};
Footer.defaultProps = {
  className: ""
};
