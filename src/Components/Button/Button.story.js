import React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { withKnobs } from "@storybook/addon-knobs";
import { withTests } from "@storybook/addon-jest";

import Button from "./Button";
import readme from "./README.md";

storiesOf("Button", module)
  .addParameters({ jest: ["Button.test"] })
  .addDecorator(withReadme(readme))
  .addDecorator(withKnobs)
  .add("Default", () => <Button>This is a button</Button>, {
    info: {
      text: readme,
    },
  });

// storiesOf("Button/Rounded", module)
//   .addDecorator(withKnobs)
//   .addDecorator(withReadme([test]))
//   .add("Rounded", () => <Button rounded>This is a rounded button</Button>);
