import React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme, withDocs, doc } from "storybook-readme";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import Button from ".";
import test from "./test.md";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(test))
  .add("inital story", () => <Button />);

storiesOf("Button/Rounded", module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(test))
  .add("inital sstory", () => <Button />);
