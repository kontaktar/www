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
  const [slideIndex, setSlideIndex] = useState();

  const onResize = () => {
    const size = window.innerWidth;
    if (size !== windowSize) {
      setSlidesToShow(settings.find((s) => size < s.breakpoint).slides);
      setWindowSize(size);
    }
  };

  onResize();

  const next = () => {
    // TODO: gera þetta að classa, extenda ControlRenderPropsin til að nota nextSlide
    setSlideIndex(slideIndex + 1 < 6 ? slideIndex + 1 : 0);
    // setSlideIndex(nextSlide);
  };

  const back = () => {
    setSlideIndex(slideIndex - 1 >= 0 ? slideIndex - 1 : 5);
  };

  return (
    <>
      <div className={styles.carousel_header}>
        <h3>Nýjustu sérfræðingarnir</h3>
        <Button.CarouselNavi
          id="carousel_back"
          direction="back"
          className={styles.button_back}
          onClick={back}
        />
        <Button.CarouselNavi
          id="carousel_next"
          direction="next"
          className={styles.button_next}
          onClick={next}
        />
      </div>
      <NukaCarousel
        className={styles.carousel}
        wrapAround
        onResize={onResize}
        slideIndex={slideIndex}
        renderTopLeftControls={({ previousSlide }) => (
          <Button.CarouselNavi
            id="lolmao"
            direction="back"
            className={styles.lolmao}
            onClick={previousSlide}
          />
        )}
        // beforeSlide={(currentSlide) => {
        //   // setNextSlide(currentSlide + 1);
        //   console.log("currentSlide", currentSlide);
        //   // console.log("nextSlide", nextSlide);
        // }}
        // afterSlide={({ ...props }) => console.log(...props)}
        // goToSlide={}
        // autoplay
        // withoutControls
        cellSpacing={20}
        enableKeyboardControls
        pauseOnHover={false}
        dragging={false}
        swiping
        transitionMode="scroll"
        // framePadding="500px"
        // frameOverflow="visible"
        // slideWidth={25000}
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
