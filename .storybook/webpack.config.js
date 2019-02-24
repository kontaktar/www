const webpackConfig = require("../webpack.config.js");

module.exports = (baseConfig, env, defaultConfig) => {
  //extending Storybooks defaultConfig
  defaultConfig.module.rules.push(...webpackConfig.module.rules);

  return defaultConfig;
};
