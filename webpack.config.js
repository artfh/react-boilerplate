var path = require('path');
var webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, 'public/scripts');

module.exports = {
  entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './src/app.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

   resolve: {
     extensions: ['', '.js', '.jsx']
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: path.join(__dirname, 'src'), loaders: ['react-hot','babel-loader'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }

    ]
  },

  devServer: {
    contentBase: './public/',
    inline:true,
    hot:true,
    proxy: {
     '/api/v1/*': 'http://localhost:3000/'
    }
 }
};
