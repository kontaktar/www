import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Footer from "./Footer";
import FooterReadme from "./README.md";

storiesOf("Footer", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["Footer.test"],
    readme: {
      sidebar: FooterReadme,
      includePropTables: [Footer],
    },
  })
  .add("Default", () => (
    <Footer
      disabled={boolean("Disabled", false)}
      onClick={action("Footer-clicked")}
    >
      {text("Label", "This is a Footer")}
    </Footer>
  ));
