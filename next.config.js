/* eslint-disable no-param-reassign */
const ESLintPlugin = require("eslint-webpack-plugin");

require("dotenv").config({ path: ".env" });

module.exports = {
  target: "serverless",
  ssr: true,
  env: {
    BASE_URL: process.env.VERCEL_URL || process.env.LOCALHOST,
    FIREBASE_EMULATOR: process.env.FIREBASE_EMULATOR || "0",
    FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST || "Missing",
    BYPASS_FIREBASE: process.env.BYPASS_FIREBASE || "0",
    SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
    FIREBASE_CLIENT_API_KEY: process.env.FIREBASE_CLIENT_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_DATABASE_URL: `${process.env.FIREBASE_PROJECT_ID}.firebase.io`
  },
  enableSvg: true,
  plugins: [new ESLintPlugin()],
  webpack(config, { dev, isServer, webpack }) {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
    );
    return config;
  }
};
