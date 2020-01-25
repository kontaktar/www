import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import SubscriptionContainer from "./SubscriptionContainer";
import SubscriptionContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["SubscriptionContainer.test"],
    readme: {
      sidebar: SubscriptionContainerReadme,
      includePropTables: [SubscriptionContainer],
    },
  })
  .add("SubscriptionContainer", () => (
    <SubscriptionContainer
      disabled={boolean("Disabled", false)}
      onClick={action("SubscriptionContainer-clicked")}
    >
      {text("Label", "This is a SubscriptionContainer")}
    </SubscriptionContainer>
  ));
