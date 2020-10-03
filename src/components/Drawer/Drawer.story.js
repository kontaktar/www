import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import Drawer from "./Drawer";
import DrawerReadme from "./README.md";

storiesOf("Components/Drawer", module)
  .addParameters({
    jest: ["Drawer.test"],
    readme: {
      sidebar: DrawerReadme,
      includePropTables: [Drawer]
    }
  })
  .add("Left side", () => (
    <div style={{ height: "200vh" }}>
      <Drawer
        disabled={boolean("Disabled", false)}
        onClick={action("Drawer-clicked")}
      />
    </div>
  ))
  .add("Right side", () => (
    <div style={{ height: "200vh" }}>
      <Drawer
        disabled={boolean("Disabled", false)}
        open={boolean("Open", true)}
        onClick={action("Drawer-clicked")}
        rightSide
      >
        {text("Label", "This is a Drawer")}
      </Drawer>
    </div>
  ));
