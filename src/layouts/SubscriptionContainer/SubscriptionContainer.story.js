import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import SubscriptionContainerReadme from "./README.md";
import SubscriptionContainer from "./SubscriptionContainer";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["SubscriptionContainer.test"],
    readme: {
      sidebar: SubscriptionContainerReadme,
      includePropTables: [SubscriptionContainer]
    }
  })
  .add("SubscriptionContainer", () => (
    <SubscriptionContainer
      disabled={boolean("Disabled", false)}
      onClick={action("SubscriptionContainer-clicked")}
    >
      {text("Label", "This is a SubscriptionContainer")}
    </SubscriptionContainer>
  ));
