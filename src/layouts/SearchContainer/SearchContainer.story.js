import React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import SearchContainer from "./SearchContainer";
import SearchContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["SearchContainer.test"],
    readme: {
      sidebar: SearchContainerReadme,
      includePropTables: [SearchContainer]
    }
  })
  .add("SearchContainer", () => (
    <div>
      <SearchContainer />
    </div>
  ));
