import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Modal from "./Modal";
import ModalReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Modal.test"],
    readme: {
      sidebar: ModalReadme,
      includePropTables: [Modal],
    },
  })
  .add("Modal", () => (
    <Modal
      disabled={boolean("Disabled", false)}
      onClick={action("Modal-clicked")}
    >
      {text("Label", "This is a Modal")}
    </Modal>
  ));
