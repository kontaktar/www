import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
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
      disabled={boolean("Disabled", false)}
      onClick={action("Navigation-clicked")}
    >
      {text("Label", "This is a Navigation")}
    </Navigation>
  ));
