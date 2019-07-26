
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Card from "./Card";
import CardReadme from "./README.md";

storiesOf("Card", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["Card.test"],
    readme: {
      sidebar: CardReadme,
      includePropTables: [Card],
    },
  })
  .add("Default", () => (
    <Card
      disabled={boolean("Disabled", false)}
      onClick={action("Card-clicked")}
    >
      {text("Label", "This is a Card")}
    </Card>
  ));
