/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Button from "./Button";
import ButtonReadme from "./README.md";

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["Button.test"],
    readme: {
      sidebar: ButtonReadme,
      includePropTables: [Button]
    }
  })
  .add("Button", () => (
    <div style={{ padding: "20px" }}>
      <p>No modifier</p>
      <Button
        disabled={boolean("Disabled", false)}
        onClick={action("button-clicked")}
      >
        {text("Label", "This is a button")}
      </Button>
      <p>Pill modifier</p>
      <Button
        id="button2"
        disabled={boolean("Disabled", false)}
        onClick={action("button-clicked")}
        modifier={["pill"]}
      >
        {text("Label", "This is a button")}
      </Button>
      <p>Disabled</p>
      <Button id="button2" disabled onClick={action("button-clicked")}>
        {text("Label", "This is a button")}
      </Button>
    </div>
  ));
