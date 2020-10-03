import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import Navigation from "./Navigation";
import NavigationReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Navigation.test"],
    readme: {
      sidebar: NavigationReadme,
      includePropTables: [Navigation]
    }
  })
  .add("Navigation", () => (
    <Navigation
      isOpen={boolean("open", true)}
      onClick={action("Navigation-clicked")}
    >
      {text("Label", "This is a Navigation")}
    </Navigation>
  ));
