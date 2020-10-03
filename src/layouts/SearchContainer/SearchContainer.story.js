import React from "react";
import { storiesOf } from "@storybook/react";

import SearchContainerReadme from "./README.md";
import SearchContainer from "./SearchContainer";

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
