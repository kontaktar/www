import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import TextArea from "./TextArea";
import TextAreaReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["TextArea.test"],
    readme: {
      sidebar: TextAreaReadme,
      includePropTables: [TextArea],
    },
  })
  .add("TextArea", () => (
    <TextArea
      disabled={boolean("Disabled", false)}
      onClick={action("TextArea-clicked")}
    >
      {text("Label", "This is a TextArea")}
    </TextArea>
  ));
