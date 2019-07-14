/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Button from "./Button";
import ButtonReadme from "./README.md";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["Button.test"],
    readme: {
      sidebar: ButtonReadme,
      includePropTables: [Button],
    },
  })
  .add("Default", () => (
    <Button
      disabled={boolean("Disabled", false)}
      onClick={action("button-clicked")}
    >
      {text("Label", "This is a button")}
    </Button>
  ));
