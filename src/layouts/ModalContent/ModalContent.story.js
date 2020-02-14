import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
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
  .add("ModalContent", () => (
    <ModalContent
      disabled={boolean("Disabled", false)}
      onClick={action("ModalContent-clicked")}
      data={{ title: "yo" }}
    >
      {text("Label", "This is a ModalContent")}
    </ModalContent>
  ));
