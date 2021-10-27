const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  core: {
    builder: "webpack5"
  },
  stories: [
    "../**/*.story.@(js|jsx|ts|tsx)"
    // "../stories/**/*.stories.mdx",
    // "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/preset-scss",
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config) => {
    config.resolve = {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve("./.storybook/tsconfig.json"),
          logLevel: "info",
          extensions: [".ts", ".tsx", ".js"]
        })
      ]
    };
    config.resolve.roots = [
      path.resolve(__dirname, "../public"),
      "node_modules"
    ];
    return config;
  }
};
