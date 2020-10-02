import React from "react";
import { storiesOf } from "@storybook/react";

import Carousel from "./Carousel";
import CarouselReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Carousel.test"],
    readme: {
      sidebar: CarouselReadme,
      includePropTables: [Carousel]
    }
  })
  .add("Carousel", () => <Carousel width={1000} />);
