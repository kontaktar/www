import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import NavigationBar from "./NavigationBar";
import NavigationBarReadme from "./README.md";

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["NavigationBar.test"],
    readme: {
      sidebar: NavigationBarReadme,
      includePropTables: [NavigationBar],
    },
  })
  .add("NavigationBar", () => (
    <NavigationBar
      disabled={boolean("Disabled", false)}
      onClick={action("NavigationBar-clicked")}
    >
      {text("Label", "This is a NavigationBar")}
    </NavigationBar>
  ));
