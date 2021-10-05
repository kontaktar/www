import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import UserTableReadme from "./README.md";
import UserTable from "./UserTable";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["UserTable.test"],
    readme: {
      sidebar: UserTableReadme,
      includePropTables: [UserTable]
    }
  })
  .add("UserTable", () => (
    <UserTable
      disabled={boolean("Disabled", false)}
      onClick={action("UserTable-clicked")}
    >
      {text("Label", "This is a UserTable")}
    </UserTable>
  ));
