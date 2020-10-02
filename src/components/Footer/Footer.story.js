import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import Footer from "./Footer";
import FooterReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Footer.test"],
    readme: {
      sidebar: FooterReadme,
      includePropTables: [Footer]
    }
  })
  .add("Footer", () => (
    <Footer
      disabled={boolean("Disabled", false)}
      onClick={action("Footer-clicked")}
    >
      {text("Label", "This is a Footer")}
    </Footer>
  ));
