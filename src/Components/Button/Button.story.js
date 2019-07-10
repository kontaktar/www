import React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import Button from "./Button";
import readme from "./README.md";

storiesOf("Button", module)
  // .addParameters({ jest: ['Button.test']})
  .addDecorator(withKnobs)
  .addDecorator(withReadme(readme))
  .add("Default", () => <Button>This is a button</Button>, {
    info: {
      text: readme,
    },
  });

// storiesOf("Button/Rounded", module)
//   .addDecorator(withKnobs)
//   .addDecorator(withReadme([test]))
//   .add("Rounded", () => <Button rounded>This is a rounded button</Button>);
