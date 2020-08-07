import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import LoginFormContainer from "./LoginFormContainer";
import LoginFormContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["LoginFormContainer.test"],
    readme: {
      sidebar: LoginFormContainerReadme,
      includePropTables: [LoginFormContainer],
    },
  })
  .add("LoginFormContainer", () => (
    <LoginFormContainer
      disabled={boolean("Disabled", false)}
      onClick={action("LoginFormContainer-clicked")}
    >
      {text("Label", "This is a LoginFormContainer")}
    </LoginFormContainer>
  ));
