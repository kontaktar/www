import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Dropdown from "./Dropdown";
import DropdownReadme from "./README.md";

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["Dropdown.test"],
    readme: {
      sidebar: DropdownReadme,
      includePropTables: [Dropdown]
    }
  })
  .add("Dropdown", () => (
    <Dropdown
      disabled={boolean("Disabled", false)}
      onClick={action("Dropdown-clicked")}
    >
      {text("Label", "This is a Dropdown")}
    </Dropdown>
  ));
