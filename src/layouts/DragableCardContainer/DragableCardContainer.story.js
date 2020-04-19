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
      items={[
        { title: "1", description: "1", length: { years: "1", months: "1" } },
        { title: "2", description: "2", length: { years: "2", months: "2" } },
        { title: "3", description: "3", length: { years: "3", months: "3" } }
      ]}
      disabled={boolean("Disabled", false)}
      onClick={action("DragableCardContainer-clicked")}
    >
      {text("Label", "This is a DragableCardContainer")}
    </DragableCardContainer>
  ));
