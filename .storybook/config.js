import { configure, addDecorator } from "@storybook/react";
// import { setOptions } from "@storybook/addon-options";

// import { withNotes } from "@storybook/addon-notes";

// addDecorator(withNotes);

const req = require.context("../src/components", true, /story\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
  // require("../stories/index.js");
}

// setOptions({
//   name: "Component Library",
//   addonPanelInRight: true,
//   sidebarAnimations: true,
// });

configure(loadStories, module);
