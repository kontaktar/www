import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import SelectReadme from "./README.md";
import Select from "./Select";

storiesOf("Components", module)
  .addParameters({
    jest: ["Select.test"],
    readme: {
      sidebar: SelectReadme,
      includePropTables: [Select]
    }
  })
  .add("Select", () => (
    <Select
      disabled={boolean("Disabled", false)}
      onClick={action("Select-clicked")}
    >
      {text("Label", "This is a Select")}
    </Select>
  ));
