// const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      { loader: "style-loader" },
      {
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: "[local]___[hash:base64:5]",
        },
      },
      { loader: "sass-loader" },
    ],
    // include: path.resolve(__dirname, "../"),
  });
  return config;
};
