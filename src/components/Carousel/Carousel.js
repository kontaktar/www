/* eslint-disable no-unused-vars */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import mockUserData from "data/all-users-mock";
// eslint-disable-next-line import/no-extraneous-dependencies
import NukaCarousel from "nuka-carousel";
import PropTypes from "prop-types";
import { Button, Card } from "components";
import usePrevious from "../../hooks/usePrevious";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Carousel.module.scss";

export const breakPointSettings = [
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
export const breakPointSettingsSecond = [
  {
    breakpoint: 332,
    slides: 1
  },
  {
    breakpoint: 664, // 2*300px (card width) + 2*32px (spacing)
    slides: 2
  },
  {
    breakpoint: 996,
    slides: 3
  },
  {
    breakpoint: 1328,
    slides: 4
  }
];

// TODO: laga að wraparoun er ekki smooth með custom buttons, virkar fínt með lyklaborði!
const Carousel = () => {
  const { width } = useWindowDimensions();
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [carouselSize, setCarouselSize] = useState(undefined);

  const users = mockUserData;

  useEffect(() => {
    let breakpoint;
    let slides;
    for (let i = 0; i < breakPointSettingsSecond.length; i += 1) {
      if (width > breakPointSettingsSecond[i].breakpoint) {
        // eslint-disable-next-line prefer-destructuring
        breakpoint = breakPointSettingsSecond[i].breakpoint;
        // eslint-disable-next-line prefer-destructuring
        slides = breakPointSettingsSecond[i].slides;
      }
    }
    if (slidesToShow !== slides) {
      setSlidesToShow(slides);
    }
    if (carouselSize !== breakpoint) {
      setCarouselSize(breakpoint);
    }
  }, [width]);

  const bySize = () => {
    let size;
    if (slidesToShow === 2) size = "medium";
    if (slidesToShow === 1) size = "small";
    return size;
  };

  return (
    <>
      <div
        className={`
          ${styles.carousel_header}
          ${styles[bySize()]}
        `}
      >
        <h3>Nýjustu sérfræðingarnir</h3>
      </div>
      <NukaCarousel
        className={`
        ${styles.carousel}
        ${styles[bySize()]}
      `}
        wrapAround
        // onResize={onResize}
        // slideIndex={slideIndex}
        renderTopRightControls={({ nextSlide }) => (
          <Button.CarouselNavi
            id="carousel_next"
            direction="next"
            className={`${styles.button_next} ${styles[bySize()]}`}
            onClick={nextSlide}
          />
        )}
        renderTopCenterControls={({ previousSlide }) => (
          <Button.CarouselNavi
            id="carousel_back"
            direction="back"
            className={`${styles.button_back} ${styles[bySize()]}`}
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
