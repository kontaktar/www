import React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import { FrontPageContainer } from "layouts";
import MainLayout from "./MainLayout";
import MainLayoutReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["MainLayout.test"],
    readme: {
      sidebar: MainLayoutReadme,
      includePropTables: [MainLayout]
    }
  })
  .add("MainLayout", () => (
    <MainLayout>
      <FrontPageContainer />
    </MainLayout>
  ));
