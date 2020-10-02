import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import Icon from "./Icon";
import icons from "./icons.json";
import IconReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Icon.test"],
    readme: {
      sidebar: IconReadme,
      includePropTables: [Icon]
    }
  })
  .add("Icon", () => {
    return icons.map((name) => (
      <div style={{ backgroundColor: "gray" }}>
        <Icon
          disabled={boolean("Disabled", false)}
          onClick={action("Icon-clicked")}
          name={name.toString()}
        >
          {text("Label", "This is a Icon")}
        </Icon>
      </div>
    ));
  });
