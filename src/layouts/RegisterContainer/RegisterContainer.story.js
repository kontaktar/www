import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import RegisterContainer from "./RegisterContainer";
import RegisterContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["RegisterContainer.test"],
    readme: {
      sidebar: RegisterContainerReadme,
      includePropTables: [RegisterContainer],
    },
  })
  .add("RegisterContainer", () => (
    <RegisterContainer
      disabled={boolean("Disabled", false)}
      onClick={action("RegisterContainer-clicked")}
    >
      {text("Label", "This is a RegisterContainer")}
    </RegisterContainer>
  ));
