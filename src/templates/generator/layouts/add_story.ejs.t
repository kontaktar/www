---
to: src/layouts/<%= name %>/<%= name %>.story.js
message: |
 - {green CREATED}: STORY
---
import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import <%= name %> from "./<%= name %>";
import <%= name %>Readme from "./README.md";

storiesOf("Layouts", module)
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
