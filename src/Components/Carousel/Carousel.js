/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import NukaCarousel from "nuka-carousel";
import { Button, Card } from "components";
import mockUserData from "data/all-users-mock";
import styles from "./Carousel.module.scss";

const settings = [
  {
    breakpoint: 1328,
    slides: 4
  },
  {
    breakpoint: 996,
    slides: 3
  },
  {
    breakpoint: 664, // 2*300px (card width) + 2*32px (spacing)
    slides: 2
  },
  {
    breakpoint: 332,
    slides: 1
  }
];

// TODO: laga að wraparoun er ekki smooth með custom buttons, virkar fínt með lyklaborði!
const Carousel = ({ width }) => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [windowSize, setWindowSize] = useState(undefined);
  const [carouselSize, setCarouselSize] = useState(undefined);

  React.useEffect(() => {
    if (windowSize !== width) {
      setWindowSize(width);
      setSlidesToShow(settings.find((s) => width > s.breakpoint).slides);
      setCarouselSize(settings.find((s) => width > s.breakpoint).breakpoint);

      console.log("carouselSiez", carouselSize);
      console.log("width", width);
    }
  }, [width, carouselSize]);

  const users = mockUserData;

  return (
    <>
      <div className={styles.carousel_header}>
        <h3>Nýjustu sérfræðingarnir</h3>
      </div>
      <NukaCarousel
        className={styles.carousel}
        wrapAround
        // onResize={onResize}
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
        // cellSpacing={20}
        cellAlign="left"
        width={carouselSize}
        enableKeyboardControls
        pauseOnHover={false}
        dragging={false}
        swiping
        transitionMode="scroll"
        slidesToShow={slidesToShow}
      >
        <Card
          name={0}
          linkToProfile={`${users[0].userName}`}
          title={`${users[0].experience[0].title}`}
          description={`${users[0].experience[0].description}`}
          years={`${users[0].experience[0].length.years}`}
          months={`${users[0].experience[0].length.months}`}
        >
          1
        </Card>
        <Card
          name={1}
          linkToProfile={`${users[1].userName}`}
          title={`${users[1].experience[0].title}`}
          description={`${users[1].experience[0].description}`}
          years={`${users[1].experience[0].length.years}`}
          months={`${users[1].experience[0].length.months}`}
        >
          2
        </Card>
        <Card
          name={2}
          linkToProfile={`${users[2].userName}`}
          title={`${users[2].experience[0].title}`}
          description={`${users[2].experience[0].description}`}
          years={`${users[2].experience[0].length.years}`}
          months={`${users[2].experience[0].length.months}`}
        >
          3
        </Card>
        <Card
          name={3}
          linkToProfile
          title="Title"
          description="Description"
          years="1"
          months="1"
        >
          4
        </Card>
        <Card
          name={4}
          linkToProfile
          title="Title"
          description="Description"
          years="2"
          months="2"
        >
          5
        </Card>
        <Card
          name={5}
          linkToProfile
          title="Title"
          description="Description"
          years="3"
          months="3"
        >
          6
        </Card>
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
