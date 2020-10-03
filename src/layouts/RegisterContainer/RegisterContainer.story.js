import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import RegisterContainerReadme from "./README.md";
import RegisterContainer from "./RegisterContainer";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["RegisterContainer.test"],
    readme: {
      sidebar: RegisterContainerReadme,
      includePropTables: [RegisterContainer]
    }
  })
  .add("RegisterContainer", () => (
    <RegisterContainer
      disabled={boolean("Disabled", false)}
      onClick={action("RegisterContainer-clicked")}
    >
      {text("Label", "This is a RegisterContainer")}
    </RegisterContainer>
  ));
