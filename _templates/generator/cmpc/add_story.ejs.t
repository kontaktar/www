---
message: |
  - { red COMPONENT STORY }
to: src/components/<%= name %>/index.story.js
---

import React from "react";
import { storiesOf } from "@storybook/react";
import <%= name %> from "./index.js";

storiesOf("<%= name %>", module)
  .add("inital story", () => (
    <<%= name %>>
    </<%= name %>>
  ));