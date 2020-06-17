import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Icon from "./Icon";
import IconReadme from "./README.md";
import icons from "./icons.json";

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
