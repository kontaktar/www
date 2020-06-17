import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Header from "./Header";
import headerReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Header.test"],
    readme: {
      sidebar: headerReadme,
      includePropTables: [Header]
    }
  })
  .add("Header", () => (
    <Header
      disabled={boolean("Disabled", false)}
      onClick={action("header-clicked")}
    >
      {text("Label", "This is a header")}
    </Header>
  ));
