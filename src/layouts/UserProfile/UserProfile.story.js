import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import UserProfile from "./UserProfile";
import UserProfileReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["UserProfile.test"],
    readme: {
      sidebar: UserProfileReadme,
      includePropTables: [UserProfile],
    },
  })
  .add("UserProfile", () => (
    <UserProfile
      disabled={boolean("Disabled", false)}
      onClick={action("UserProfile-clicked")}
    >
      {text("Label", "This is a UserProfile")}
    </UserProfile>
  ));
