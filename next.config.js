/* eslint-disable no-param-reassign */
// require("dotenv").config();

const path = require("path");
// const Dotenv = require("dotenv-webpack");
const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withFonts = require("next-fonts");

module.exports = withPlugins([[withCSS], [withSass], [withFonts]], {
  // target: "serverless",
  publicRuntimeConfig: false,
  ssr: true,
  // env: {
  //   API_URL: process.env.API_URL || "http://localhost:3000"
  // },
  enableSvg: true,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  webpack(config, { dev, isServer }) {
    config.resolve.alias.components = path.join(__dirname, "src/components");
    config.resolve.alias.assets = path.join(__dirname, "src/assets");
    config.resolve.alias.layouts = path.join(__dirname, "src/layouts");
    config.resolve.alias.styles = path.join(__dirname, "src/styles");
    // config.plugins.push(
    //   // Read the .env file
    //   new Dotenv({
    //     path: path.join(__dirname, ".env"),
    //     systemvars: true
    //   })
    // );
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      });
    }
    return config;
  }
});
