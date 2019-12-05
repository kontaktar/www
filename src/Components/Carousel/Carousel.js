import React, { useState } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import NukaCarousel from "nuka-carousel";
import { Button, Card } from "components";
import styles from "./Carousel.module.scss";

const settings = [
  {
    breakpoint: 500,
    slides: 1
  },
  {
    breakpoint: 800,
    slides: 2
  },
  {
    breakpoint: 1100,
    slides: 3
  },
  {
    breakpoint: 1400,
    slides: 4
  }
];

// TODO: laga að wraparoun er ekki smooth með custom buttons, virkar fínt með lyklaborði!
const Carousel = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [windowSize, setWindowSize] = useState(undefined);
  // const [slideIndex, setSlideIndex] = useState();

  const onResize = () => {
    const size = window.innerWidth;
    if (size !== windowSize) {
      setSlidesToShow(settings.find((s) => size < s.breakpoint).slides);
      setWindowSize(size);
    }
  };

  onResize();

  // const next = () => {
  //   // TODO: gera þetta að classa, extenda ControlRenderPropsin til að nota nextSlide
  //   // setSlideIndex(slideIndex + 1 < 6 ? slideIndex + 1 : 0);
  //   // setSlideIndex(nextSlide);
  //   // setSlideIndex(slideIndex + 1);
  // };

  // const back = () => {
  //   // setSlideIndex(slideIndex - 1 >= 0 ? slideIndex - 1 : 5);
  //   setSlideIndex(slideIndex - 1);
  // };

  return (
    <>
      <div className={styles.carousel_header}>
        <h3>Nýjustu sérfræðingarnir</h3>
        {/* <Button.CarouselNavi
          id="carousel_back"
          direction="back"
          className={styles.button_back}
          onClick={back}
        /> */}
      </div>
      <NukaCarousel
        className={styles.carousel}
        wrapAround
        onResize={onResize}
        // slideIndex={slideIndex}
        renderTopRightControls={({ nextSlide }) => (
          <Button.CarouselNavi
            id="carousel_next"
            direction="next"
            className={styles.button_next}
            onClick={nextSlide}
          />
        )}
        renderTopCenterControls={({ previousSlide }) => (
          <Button.CarouselNavi
            id="carousel_back"
            direction="back"
            className={styles.button_back}
            onClick={previousSlide}
          />
        )}
        cellSpacing={20}
        // enableKeyboardControls
        pauseOnHover={false}
        dragging={false}
        swiping
        transitionMode="scroll"
        slidesToShow={slidesToShow}
      >
        <Card name={0}>1</Card>
        <Card name={1}>2</Card>
        <Card name={2}>3</Card>
        <Card name={3}>4</Card>
        <Card name={4}>5</Card>
        <Card name={5}>6</Card>
      </NukaCarousel>
    </>
  );
};

export default Carousel;

Carousel.propTypes = {
  className: PropTypes.string
};
Carousel.defaultProps = {
  className: ""
};
