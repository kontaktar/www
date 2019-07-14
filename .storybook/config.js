import { configure, addDecorator, addParameters } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import { withA11y } from "@storybook/addon-a11y";
import { addReadme } from "storybook-readme";
import results from "../.jest-test-results.json";
import viewports from "./viewports.js";

addDecorator(addReadme);
addDecorator(withA11y);
addDecorator(
  withTests({
    results,
  }),
);
addParameters({
  viewport: { viewports: viewports },
  options: {
    brandTitle: " ♊️ SpezTorg",
    showPanel: true,
    panelPosition: "bottom",
    isToolshown: true,
  },
});

const req = require.context("../src/components", true, /story\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
