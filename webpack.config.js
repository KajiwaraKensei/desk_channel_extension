const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    content: "./src/content/script/index.ts",
    popup: "./src/popup/script/index.tsx",
    background: "./src/background/script/index.js",
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "[name]/script.min.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "/src"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["popup"],
      template: "./src/popup/index.html",
      filename: "./popup/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./[name]/style.css",
    }),
  ],
  target: ["web", "es5"],
};
