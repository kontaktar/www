import { ReactElement, useEffect, useState } from "react";
import NukaCarousel from "nuka-carousel";
import { useSelector } from "react-redux";
import { randomize } from "helpers/arrays";
import { Button, Card } from "components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Carousel.module.scss";

/**
 * THE FIRST THING THAT NEEDS TO BE REWRITTEN IS THIS PILE OF CRAP
 * PLEASE JUST SCRAP IT ALL AND START OVER.
 */

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
const Carousel = (): ReactElement => {
  const { width } = useWindowDimensions();
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [carouselSize, setCarouselSize] = useState(undefined);
  const [elementSize, setSize] = useState(undefined);
  const [fiveRandomCards, setFiveRandomCards] = useState([]);
  const searchState = useSelector((state) => state.searches);

  useEffect(() => {
    if (searchState?.inputs?.[""]) {
      setFiveRandomCards(
        randomize(Object.values(searchState?.inputs[""])).slice(0, 5)
      );
    }
  }, [searchState?.inputs]);
  useEffect(() => {
    let breakpoint = 332;
    let slides = 1;
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
    let size;
    if (slides === 2) size = "medium";
    if (slides === 1) size = "small";
    setSize(size);
  }, [carouselSize, slidesToShow, width]);

  return (
    <div className={styles.carousel_root}>
      <div
        className={`
          ${styles.carousel_header}
          ${styles[elementSize]}
        `}
      >
        <h2>Kontaktar af handahófi</h2>
      </div>
      <NukaCarousel
        className={`
        ${styles.carousel}
        ${styles[elementSize]}
      `}
        wrapAround
        // onResize={onResize}
        // slideIndex={slideIndex}
        renderTopRightControls={({ nextSlide }) => (
          <Button.CarouselNavi
            id="carousel_next"
            direction="next"
            className={`${styles.button_next} ${styles[elementSize]}`}
            onClick={nextSlide}
          />
        )}
        renderTopCenterControls={({ previousSlide }) => (
          <Button.CarouselNavi
            id="carousel_back"
            direction="back"
            className={`${styles.button_back} ${styles[elementSize]}`}
            onClick={previousSlide}
          />
        )}
        // cellSpacing={20}
        cellAlign="left"
        width={carouselSize?.toString()}
        enableKeyboardControls
        pauseOnHover={false}
        dragging={false}
        swiping
        transitionMode="scroll"
        slidesToShow={slidesToShow}
      >
        {fiveRandomCards.length > 0 ? (
          fiveRandomCards.map((card, i) => (
            <Card
              id={i}
              key={`${card.userId}${card.experienceId}`}
              title={card?.title}
              description={card?.description}
              years={card?.years}
              months={card?.months}
              linkToProfile={{
                userName: card?.userName,
                experienceId: card?.experienceId
              }}
            />
          ))
        ) : (
          <Card />
        )}
      </NukaCarousel>
    </div>
  );
};

export default Carousel;
