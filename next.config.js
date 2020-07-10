/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-param-reassign */
require("dotenv").config({ path: ".env" });

const withPlugins = require("next-compose-plugins");
// const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withFonts = require("next-fonts");

module.exports = withPlugins([[withSass], [withFonts]], {
  target: "serverless",
  // publicRuntimeConfig: false,
  ssr: true,
  env: {
    BASE_URL: process.env.VERCEL_URL || "localhost:3000"
  },
  enableSvg: true,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  webpack(config, { dev, isServer, webpack }) {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      });
    }
    config.plugins.push(new webpack.IgnorePlugin(/^pg-native$/));
    return config;
  },
  // I dont think this is doing anything. I thought fetch was adding trailing slash.
  async exportPathMap() {
    return {
      "/api/users/": { page: "/api/user" }
    };
  }
});
