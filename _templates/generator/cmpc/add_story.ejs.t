---
message: |
  - { red COMPONENT STORY }
to: src/components/<%= name %>/<%= name.toLowerCase() %>.story.js
---

import React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import <%= name %> from ".";
import docs from "./<%= name.toLowerCase() %>.docs.md"

storiesOf("<%= name %>", module)
  .addDecorator(withReadme(docs))
  .add("inital story", () => (
    <<%= name %>>
    </<%= name %>>
  ));