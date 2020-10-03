import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import ModalContent from "./ModalContent";
import ModalContentReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["ModalContent.test"],
    readme: {
      sidebar: ModalContentReadme,
      includePropTables: [ModalContent]
    }
  })
  .add("ModalContent/Experience", () => (
    <ModalContent
      disabled={boolean("Disabled", false)}
      onClick={action("ModalContent-clicked")}
      data={{ title: "yo" }}
      experience
    >
      {text("Label", "This is a ModalContent")}
    </ModalContent>
  ))
  .add("ModalContent/UserInformation", () => (
    <ModalContent
      disabled={boolean("Disabled", false)}
      onClick={action("ModalContent-clicked")}
      data={{ title: "yo" }}
      userInformation
    >
      {text("Label", "This is a ModalContent")}
    </ModalContent>
  ));
