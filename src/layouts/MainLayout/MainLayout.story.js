import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
// import { action } from "@storybook/addon-actions";
import { SearchContainer } from "layouts";
import MainLayout from "./MainLayout";
import MainLayoutReadme from "./README.md";

storiesOf("Layouts/MainLayout", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["MainLayout.test"],
    readme: {
      sidebar: MainLayoutReadme,
      includePropTables: [MainLayout]
    }
  })
  .add("SearchLayout", () => (
    <MainLayout>
      <SearchContainer />
    </MainLayout>
  ));
