import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import AdminContainer from "./AdminContainer";
import AdminContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["AdminContainer.test"],
    readme: {
      sidebar: AdminContainerReadme,
      includePropTables: [AdminContainer]
    }
  })
  .add("AdminContainer", () => (
    <AdminContainer
      disabled={boolean("Disabled", false)}
      onClick={action("AdminContainer-clicked")}
    >
      {text("Label", "This is a AdminContainer")}
    </AdminContainer>
  ));
