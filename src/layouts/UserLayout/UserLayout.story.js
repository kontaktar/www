import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import ProfileContainer from "../ProfileContainer";
import UserLayout from "./UserLayout";
import UserLayoutReadme from "./README.md";

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
