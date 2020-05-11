const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",

  output: {
    path: path.resolve("build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },

  externals: {
    react: "react",
    "moment-jalaali": "moment-jalaali",
  },

  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "app.css",
  //     chunkFilename: "[id].css",
  //   }),
  // ],

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
