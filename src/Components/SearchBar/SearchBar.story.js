import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import SearchBar from "./SearchBar";
import SearchBarReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["SearchBar.test"],
    readme: {
      sidebar: SearchBarReadme,
      includePropTables: [SearchBar],
    },
  })
  .add("SearchBar", () => (
    <SearchBar
      disabled={boolean("Disabled", false)}
      onClick={action("SearchBar-clicked")}
    >
      {text("Label", "This is a SearchBar")}
    </SearchBar>
  ));
