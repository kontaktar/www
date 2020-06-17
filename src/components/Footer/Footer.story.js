import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
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
