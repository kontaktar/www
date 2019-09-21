import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import ProfileContainer from "./ProfileContainer";
import ProfileContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addDecorator(withKnobs)
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
