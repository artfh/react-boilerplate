'use strict';
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var config = require('../webpack.config');
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
   publicPath: config.output.publicPath,
   contentBase: './public/',
   hot: true,
   quiet: false,
   noInfo: false,
   proxy: {
    "/api/*": "http://localhost:5000"
  },
   stats: { colors: true }
});
server.listen(8080, "localhost", function() {
  console.info("==> 🌎 WebpackDevServer listening on port %s. Open up http://localhost:%s/ in your browser.", 8080, 8080);
});

/*
var express = require('express');
var app = express();

var multiparty = require('multiparty');
var util = require('util');

app.get('/api/test', function (req, res) {
  res.send('Hello World!');
});

app.listen(8081, function () {
  console.log('==> 🌎 Backend app listening on port 8081!');
});
*/
