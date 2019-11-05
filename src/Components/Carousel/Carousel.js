import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  CarouselProvider,
  Slide,
  Slider,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Card } from "components";
import styles from "./Carousel.module.scss";

const Carousel = () => {
  const reference = useRef();
  // const [width, setWidth] = useState(); // TODO: adjust this
  const [visibleSlides, setVisibleSlides] = useState(0);
  useEffect(() => {
    function handleResize() {
      // setWidth(reference.current.offsetWidth);
      setVisibleSlides(Math.floor(reference.current.offsetWidth / 350));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.carousel} id="carousel" ref={reference}>
      <CarouselProvider
        naturalSlideWidth={300}
        naturalSlideHeight={250}
        totalSlides={6}
        visibleSlides={visibleSlides}
        infinite
      >
        <div className={styles.carousel_header}>
          <h3>Nýjustu kontaktarnir</h3>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </div>
        <Slider>
          <div className={styles.slider}>
            <Slide className={styles.slide} index={0}>
              <Card name="einar">Siggi</Card>
            </Slide>
            <Slide className={styles.slide} index={1}>
              <Card name="ADsSADSA">S</Card>
            </Slide>
            <Slide className={styles.slide} index={2}>
              <Card name="ADSASD">a</Card>
            </Slide>
            <Slide className={styles.slide} index={3}>
              <Card name="SADAS">E</Card>
            </Slide>
            <Slide className={styles.slide} index={4}>
              <Card name="SADAS">E</Card>
            </Slide>
            <Slide className={styles.slide} index={5}>
              <Card name="6">666</Card>
            </Slide>
          </div>
        </Slider>
      </CarouselProvider>
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
