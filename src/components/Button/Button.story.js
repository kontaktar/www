/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import Button from "./Button";
import ButtonReadme from "./README.md";

storiesOf("Components", module)
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
      <p>Inverted modifier</p>
      <Button
        id="button2"
        disabled={boolean("Disabled", false)}
        onClick={action("button-clicked")}
        modifier={["inverted"]}
      >
        {text("Label", "This is a button")}
      </Button>
      <p>Disabled</p>
      <Button id="button2" disabled onClick={action("button-clicked")}>
        {text("Label", "This is a button")}
      </Button>
      <Button.Navigation />
      <Button.Navigation compact />
      <p>Rectangle modifier</p>
      <Button
        id="button2"
        disabled={boolean("Disabled", false)}
        onClick={action("button-clicked")}
        modifier={["rectangle"]}
      />
      <p>Rectangle and inverted modifier</p>
      <Button
        id="button2"
        disabled={boolean("Disabled", false)}
        onClick={action("button-clicked")}
        modifier={["rectangle", "inverted"]}
      />
      <p>CarouseleNavi next</p>
      <Button.CarouselNavi
        id="button2"
        direction="next"
        disabled={boolean("Disabled", false)}
        onClick={action("button-clicked")}
      />
      <p>CarouseleNavi back</p>
      <Button.CarouselNavi
        id="button2"
        direction="back"
        disabled={boolean("Disabled", false)}
        onClick={action("button-clicked")}
      />
      <Button.Edit type="save" />
      <Button.Edit type="publish" />
    </div>
  ));
