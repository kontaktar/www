---
to: src/components/<%= name %>/<%= name %>.story.js
message: |
 - {green CREATED}: STORY
---
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import <%= name %> from "./<%= name %>";
import <%= name %>Readme from "./README.md";

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["<%= name %>.test"],
    readme: {
      sidebar: <%= name %>Readme,
      includePropTables: [<%= name %>],
    },
  })
  .add("<%= name %>", () => (
    <<%= name %>
      disabled={boolean("Disabled", false)}
      onClick={action("<%= name %>-clicked")}
    >
      {text("Label", "This is a <%= name %>")}
    </<%= name %>>
  ));
