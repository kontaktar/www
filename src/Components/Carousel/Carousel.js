import React from "react";
import PropTypes from "prop-types";
import styles from "./Carousel.module.scss";

const Carousel = () => {
  return (
    <div className={styles.carousel}>
      <p>NOT RIGHT NOW</p>
    </div>
  );
};

export default Carousel;

Carousel.propTypes = {
  className: PropTypes.string
};
Carousel.defaultProps = {
  className: ""
};
