const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = ({ config }) => {
  config.resolve = {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve("./tsconfig.json"),
        logLevel: "info",
        extensions: [".ts", ".tsx", ".js"]
      })
    ]
  };
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        { loader: "style-loader" },
        {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: "[local]___[hash:base64:5]"
          }
        },
        { loader: "sass-loader" }
      ]
    },
    {
      test: /\.ts$|tsx/,
      exclude: /^node_modules/,
      loader: "ts-loader",
      options: {
        configFile: path.resolve("./tsconfig.json")
      }
    }
  );
  return config;
};
