import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Icon from "./Icon";
import IconReadme from "./README.md";

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["Icon.test"],
    readme: {
      sidebar: IconReadme,
      includePropTables: [Icon]
    }
  })
  .add("Icon", () => (
    <Icon
      disabled={boolean("Disabled", false)}
      onClick={action("Icon-clicked")}
      name="user-profile"
    >
      {text("Label", "This is a Icon")}
    </Icon>
  ));
