import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import DropdownMenu from "./DropdownMenu";
import DropdownMenuReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["DropdownMenu.test"],
    readme: {
      sidebar: DropdownMenuReadme,
      includePropTables: [DropdownMenu]
    }
  })
  .add("DropdownMenu", () => (
    <DropdownMenu
      disabled={boolean("Disabled", false)}
      onClick={action("DropdownMenu-clicked")}
    >
      {text("Label", "This is a DropdownMenu")}
    </DropdownMenu>
  ));
