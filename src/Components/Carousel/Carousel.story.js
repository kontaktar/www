import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Carousel from "./Carousel";
import CarouselReadme from "./README.md";

storiesOf("Carousel", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["Carousel.test"],
    readme: {
      sidebar: CarouselReadme,
      includePropTables: [Carousel],
    },
  })
  .add("Default", () => (
    <Carousel
      disabled={boolean("Disabled", false)}
      onClick={action("Carousel-clicked")}
    >
      {text("Label", "This is a Carousel")}
    </Carousel>
  ));
