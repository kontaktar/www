import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Drawer from "./Drawer";
import DrawerReadme from "./README.md";

storiesOf("Drawer", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["Drawer.test"],
    readme: {
      sidebar: DrawerReadme,
      includePropTables: [Drawer]
    }
  })
  .add("Default", () => (
    <Drawer
      disabled={boolean("Disabled", false)}
      onClick={action("Drawer-clicked")}
    >
      {text("Label", "This is a Drawer")}
    </Drawer>
  ));
