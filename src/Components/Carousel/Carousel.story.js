import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Carousel from "./Carousel";
import CarouselReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Carousel.test"],
    readme: {
      sidebar: CarouselReadme,
      includePropTables: [Carousel],
    },
  })
  .add("Carousel", () => (
    <Carousel
      disabled={boolean("Disabled", false)}
      onClick={action("Carousel-clicked")}
    >
      {text("Label", "This is a Carousel")}
    </Carousel>
  ));
