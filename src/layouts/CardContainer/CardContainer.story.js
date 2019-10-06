import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import CardContainer from "./CardContainer";
import CardContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["CardContainer.test"],
    readme: {
      sidebar: CardContainerReadme,
      includePropTables: [CardContainer],
    },
  })
  .add("CardContainer", () => (
    <CardContainer
      disabled={boolean("Disabled", false)}
      onClick={action("CardContainer-clicked")}
    >
      {text("Label", "This is a CardContainer")}
    </CardContainer>
  ));
