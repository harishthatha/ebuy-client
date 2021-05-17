import express from "express";
import path from "path";

const server = express();

const webpack = require("webpack");
const config = require("../../config/webpack.dev.js");
const compiler = webpack(config);

const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

server.use(webpackHotMiddleware);

server.use(webpackDevMiddleware);

const staticMiddleware = express.static("dist");

server.use(staticMiddleware);

const PORT = "8082";

server.listen(PORT, () => {
  console.log("Server is listening at http://localhost:" + PORT);
});
