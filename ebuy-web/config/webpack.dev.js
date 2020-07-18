const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

//const componentsHtmlPath = "./apps/components/index.html"
const easyBuyHtmlPath = "./apps/easy-buy/index.html";

module.exports = {
  entry: {
    main: "./scripts/serve-dev.js",
  },
  stats: "errors-warnings",
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
  },
  devServer: {
    contentBase: "build",
    overlay: true,
    stats: {
      colors: true,
      cached: false,
      cachedAssets: false,
      chunks: false,
      chunkModules: false,
      chunkRootModules: false,
      chunksSort: "name",
      chunkOrigins: false,
      modules: false,
      outputPath: false,
    },
    hot: true,
    historyApiFallback: true,
  },
  node: {
    fs: "empty",
    net: "empty",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
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
      {
        test: /\.scss$/,
        use: [
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024000,
              //name: "../src/images/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: ".env", // path to .env file
    }),
    new HtmlWebpackPlugin({
      template: easyBuyHtmlPath,
    }),
  ],
};
