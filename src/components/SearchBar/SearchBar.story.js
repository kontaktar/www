import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import SearchBarReadme from "./README.md";
import SearchBar from "./SearchBar";

storiesOf("Components", module)
  .addParameters({
    jest: ["SearchBar.test"],
    readme: {
      sidebar: SearchBarReadme,
      includePropTables: [SearchBar]
    }
  })
  .add("SearchBar", () => (
    <>
      <SearchBar
        disabled={boolean("Disabled", false)}
        onClick={action("SearchBar-clicked")}
      />
      <SearchBar.Results />
    </>
  ));
