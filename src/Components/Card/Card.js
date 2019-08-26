import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.scss";

const Card = (props) => {
  const { children } = props;
  return (
    <div className={styles.card} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired
};
const CardContent = (props) => {
  let { paragraph, signature } = props;
  if (paragraph.length > 300) {
    paragraph = `${paragraph.slice(0, 300)} ...`;
  }
  if (signature.length > 100) {
    signature = `${signature.slice(0, 100)}`;
  }

  return (
    <Card className={styles.card_content}>
      <span className={styles.signature}>
        <span className={styles.icon} />
        {signature}
      </span>
      <span className={styles.paragraph}>{paragraph}</span>
    </Card>
  );
};

CardContent.propTypes = {
  paragraph: PropTypes.string.isRequired,
  signature: PropTypes.string.isRequired
};

export { Card, CardContent };
// Card.propTypes = {}
// Card.defaultProps = {}
