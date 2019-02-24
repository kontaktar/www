import { configure } from "@storybook/react";
// import { setOptions } from "@storybook/addon-options";

const req = require.context("../src/Components", true, /story\.js$/);

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
