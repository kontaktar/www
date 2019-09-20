import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
// import { action } from "@storybook/addon-actions";
import SearchContainer from "./SearchContainer";
import SearchContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addDecorator(withKnobs)
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
