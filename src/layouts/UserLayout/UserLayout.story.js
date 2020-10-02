import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import ProfileContainer from "../ProfileContainer";

import UserLayoutReadme from "./README.md";
import UserLayout from "./UserLayout";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["UserLayout.test"],
    readme: {
      sidebar: UserLayoutReadme,
      includePropTables: [UserLayout]
    }
  })
  .add("UserLayout", () => (
    <UserLayout
      disabled={boolean("Disabled", false)}
      onClick={action("UserLayout-clicked")}
    >
      {text("Label", "This is a UserLayout")}
    </UserLayout>
  ))
  .add("UserLayout Profile", () => (
    <UserLayout>
      <ProfileContainer editMode />
    </UserLayout>
  ));
