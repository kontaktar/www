import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { ModalContent } from "layouts";
import Modal from "./Modal";
import ModalReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Modal.test"],
    readme: {
      sidebar: ModalReadme,
      includePropTables: [Modal]
    }
  })
  .add("Modal", () => (
    <Modal
      disabled={boolean("Disabled", false)}
      onClick={action("Modal-clicked")}
      open
      // height="300px"
      // width="300px"
    >
      <ModalContent data={{ title: "title" }} />
    </Modal>
  ));
