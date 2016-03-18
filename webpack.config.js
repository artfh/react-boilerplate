var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/scripts');

module.exports = {
  entry: [
      'webpack/hot/dev-server',
      './src/app.jsx'],
  output: {
    //path: BUILD_DIR,
    filename: 'bundle.js'
  },

   resolve: {
     extensions: ['', '.js', '.jsx']
   },

  module: {
    loaders: [
      { test: path.join(__dirname, 'src'), loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }

    ]
  },

  devServer: {
    contentBase: './public/',
    proxy: {
     '/api/v1/*': 'http://localhost:3000/'
    }
 }
};
