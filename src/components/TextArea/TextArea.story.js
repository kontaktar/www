import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import TextAreaReadme from "./README.md";
import TextArea from "./TextArea";

storiesOf("Components", module)
  .addParameters({
    jest: ["TextArea.test"],
    readme: {
      sidebar: TextAreaReadme,
      includePropTables: [TextArea]
    }
  })
  .add("TextArea", () => (
    <TextArea
      disabled={boolean("Disabled", false)}
      onClick={action("TextArea-clicked")}
    >
      {text("Label", "This is a TextArea")}
    </TextArea>
  ));
