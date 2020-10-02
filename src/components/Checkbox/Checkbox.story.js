import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import Checkbox from "./Checkbox";
import CheckboxReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Checkbox.test"],
    readme: {
      sidebar: CheckboxReadme,
      includePropTables: [Checkbox]
    }
  })
  .add("Checkbox", () => (
    <Checkbox
      disabled={boolean("Disabled", false)}
      onClick={action("Checkbox-clicked")}
    >
      {text("Label", "This is a Checkbox")}
    </Checkbox>
  ));
