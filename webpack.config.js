const path = require("path");

module.exports = {
  entry: {
    pynotebook: "./src/view/app/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "pynotebook"),
    filename: "[name].js",
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {},
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },
};
