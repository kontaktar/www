import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Select from "./Select";
import SelectReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Select.test"],
    readme: {
      sidebar: SelectReadme,
      includePropTables: [Select],
    },
  })
  .add("Select", () => (
    <Select
      disabled={boolean("Disabled", false)}
      onClick={action("Select-clicked")}
    >
      {text("Label", "This is a Select")}
    </Select>
  ));
