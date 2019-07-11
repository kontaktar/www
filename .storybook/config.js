import { configure, addDecorator } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import { withA11y } from "@storybook/addon-a11y";
import results from "../.jest-test-results.json";

addDecorator(withA11y);
addDecorator(
  withTests({
    results,
  }),
);

const req = require.context("../src/components", true, /story\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
