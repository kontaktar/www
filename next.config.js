/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-param-reassign */
require("dotenv").config({ path: ".env" });

module.exports = {
  target: "serverless",
  // publicRuntimeConfig: false,
  ssr: true,
  env: {
    BASE_URL: process.env.VERCEL_URL || "localhost:3000",
    SECRET_COOKIE_PASSWORD: "THIS_HAS_TO_BE_AT_LEAST_32_LETTER_LONG" // TODO: host at VERCEL (and change ofcourse)
  },
  enableSvg: true,
  webpack(config, { dev, isServer, webpack }) {
    if (dev) {
      config.module.rules.push({
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
        // options: {
        //   fix: true
        // }
      });
    }
    config.plugins.push(new webpack.IgnorePlugin(/^pg-native$/));
    return config;
  }
};
