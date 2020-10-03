import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import FrontPageContainer from "./FrontPageContainer";
import FrontPageContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["FrontPageContainer.test"],
    readme: {
      sidebar: FrontPageContainerReadme,
      includePropTables: [FrontPageContainer]
    }
  })
  .add("FrontPageContainer", () => (
    <FrontPageContainer
      disabled={boolean("Disabled", false)}
      onClick={action("FrontPageContainer-clicked")}
    >
      {text("Label", "This is a FrontPageContainer")}
    </FrontPageContainer>
  ));
