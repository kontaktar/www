import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import ProfileContainer from "./ProfileContainer";
import ProfileContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["ProfileContainer.test"],
    readme: {
      sidebar: ProfileContainerReadme,
      includePropTables: [ProfileContainer]
    }
  })
  .add("ProfileContainer", () => (
    <ProfileContainer
      disabled={boolean("Disabled", false)}
      onClick={action("ProfileContainer-clicked")}
    >
      {text("Label", "This is a ProfileContainer")}
    </ProfileContainer>
  ));
