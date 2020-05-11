const path = require("path");

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
    "react-dom": "react-dom",
    "moment-jalaali": "moment-jalaali",
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
