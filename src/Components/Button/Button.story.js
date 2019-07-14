/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
import { storiesOf } from "@storybook/react";
// import { withReadme } from "storybook-readme";
import { withKnobs } from "@storybook/addon-knobs";
// import { withTests } from "@storybook/addon-jest";

import { action } from "@storybook/addon-actions";
import Button from "./Button";
import ButtonReadme from "./README.md";

storiesOf("Button", module)
  .addParameters({
    jest: ["Button.test"],
    readme: {
      sidebar: ButtonReadme,
      highlightSidebar: true,
      includePropTables: Button,
    },
  })
  // .addDecorator(withReadme(readme))
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Button onClick={action("button-click")}>This is a button</Button>
  ));

// storiesOf("Button/Rounded", module)
//   .addDecorator(withKnobs)
//   .addDecorator(withReadme([test]))
//   .add("Rounded", () => <Button rounded>This is a rounded button</Button>);
