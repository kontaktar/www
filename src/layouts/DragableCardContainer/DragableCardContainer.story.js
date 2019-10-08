import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import DragableCardContainer from "./DragableCardContainer";
import DragableCardContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["DragableCardContainer.test"],
    readme: {
      sidebar: DragableCardContainerReadme,
      includePropTables: [DragableCardContainer]
    }
  })
  .add("DragableCardContainer", () => (
    <DragableCardContainer
      disabled={boolean("Disabled", false)}
      onClick={action("DragableCardContainer-clicked")}
    >
      {text("Label", "This is a DragableCardContainer")}
    </DragableCardContainer>
  ));
