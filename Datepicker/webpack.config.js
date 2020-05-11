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
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
    "moment-jalaali": "commonjs moment-jalaali",
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
