import { configure, addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withTests } from "@storybook/addon-jest";
import { withKnobs } from "@storybook/addon-knobs";
import { addReadme } from "storybook-readme";
import results from "../.jest-test-results.json";
import viewports from "./viewports.js";

addDecorator(withKnobs);
addDecorator(addReadme);
addDecorator(withA11y);
addDecorator(
  withTests({
    results
  })
);
addParameters({
  options: {
    brandTitle: " ♊️ SpezTorg"
  },
  readme: {
    codeTheme: "github"
  },
  viewport: { viewports: viewports }
});

const req = require.context("../src/", true, /.story\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
