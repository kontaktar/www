import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import CardsContainer from "./CardsContainer";
import CardsContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["CardsContainer.test"],
    readme: {
      sidebar: CardsContainerReadme,
      includePropTables: [CardsContainer]
    }
  })
  .add("CardsContainer", () => (
    <CardsContainer
      disabled={boolean("Disabled", false)}
      onClick={action("CardsContainer-clicked")}
    >
      {text("Label", "This is a CardsContainer")}
    </CardsContainer>
  ));
