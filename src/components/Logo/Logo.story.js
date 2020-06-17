import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Logo from "./Logo";
import LogoReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Logo.test"],
    readme: {
      sidebar: LogoReadme,
      includePropTables: [Logo]
    }
  })
  .add("Logo", () => (
    <>
      <Logo
        disabled={boolean("Disabled", false)}
        onClick={action("Logo-clicked")}
      />
      <span>withTitle</span>
      <Logo withTitle onClick={action("Logo-clicked")} />
      <span>inverted</span>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        <Logo withTitle inverted onClick={action("Logo-clicked")} />
      </div>
    </>
  ));
