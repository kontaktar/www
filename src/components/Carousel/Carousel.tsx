import { ReactElement } from "react";
import ResponsiveCarousel from "react-multi-carousel";
import cx from "classnames";
import { Button, Card } from "components";
import "react-multi-carousel/lib/styles.css";
import styles from "./Carousel.module.scss";

const Carousel = ({ cards }: { cards: any }): ReactElement => {
  const responsive = {
    largeDesktop: {
      breakpoint: { max: 9999, min: 1328 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1328, min: 1016 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1016, min: 684 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 684, min: 0 },
      items: 1
    }
  };

  const CustomRightArrow = ({ onClick, carouselState }) => {
    // console.log("deviceType", carouselState.deviceType);
    return (
      <Button.CarouselNavi
        id="carousel_next"
        direction="next"
        className={cx(styles.button_next, {
          [styles.button_next_small]: carouselState.deviceType === "mobile"
        })}
        onClick={onClick}
      />
    );
  };
  const CustomLeftArrow = ({ onClick, carouselState }) => {
    return (
      <Button.CarouselNavi
        id="carousel_back"
        direction="back"
        className={cx(styles.button_back, {
          [styles.button_back_small]: carouselState.deviceType === "mobile"
        })}
        onClick={onClick}
      />
    );
  };

  return (
    <div className={styles.carousel_root}>
      <div
        className={`
          ${styles.carousel_header}
        `}
      >
        <h2>Kontaktar af handahófi</h2>
      </div>
      <ResponsiveCarousel
        ssr
        responsive={responsive}
        infinite
        draggable
        swipeable
        renderButtonGroupOutside
        // partialVisible
        // centerMode
        autoPlay
        autoPlaySpeed={6000}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
      >
        {cards.length > 0 ? (
          cards.map((card, i) => (
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
      </ResponsiveCarousel>
    </div>
  );
};

export default Carousel;
