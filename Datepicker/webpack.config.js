const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  devtool: "source-map",

  output: {
    path: path.resolve("lib"),
    filename: "RangePicker.js",
    sourceMapFilename: "RangePicker.sourcemap.js.map",
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

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
    }),
  ],

  externals: {
    react: "react",
    "react-dom": "react-dom",
    "moment-jalaali": "moment-jalaali",
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
