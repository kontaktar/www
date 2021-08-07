/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-param-reassign */
require("dotenv").config({ path: ".env" });

module.exports = {
  target: "serverless",
  // publicRuntimeConfig: false,
  ssr: true,
  env: {
    BASE_URL: process.env.VERCEL_URL || "localhost:3000",
    FIREBASE_EMULATOR: process.env.FIREBASE_EMULATOR || "0",
    FIREBASE_AUTH_EMULATOR_HOST:
      process.env.FIREBASE_AUTH_EMULATOR_HOST || "Missing",
    BYPASS_FIREBASE: process.env.BYPASS_FIREBASE || "0",
    SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
    FIREBASE_CLIENT_API_KEY: process.env.FIREBASE_CLIENT_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_DATABASE_URL: `${process.env.FIREBASE_PROJECT_ID}.firebase.io`
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
