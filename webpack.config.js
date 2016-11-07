// var WebpackDevServer = require("webpack-dev-server")
// const webpack = require('webpack');
// //const path = require('path');
// //const config = require('config');
// //const hostname = config.get('dev_server_hostname');
// //const port = config.get('dev_server_port');
const hostname = "127.0.0.1";
const port = 8076
const client = 500
//
// var pragmas = new webpack.DefinePlugin({
//   __DEV__: 'true',
//   __CANVAS_API_TOKEN__: JSON.stringify(config.get('api_token'))
// });

module.exports = {
  entry: {
    'bundle': './src/main.js',
  },

  output: {
    path: './dist',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.json/, loader: 'json-loader'},
    ]
  },

  devServer: {
    hot: true,
    //host: hostname,
    //port: port,
    historyApiFallback: true,
    client: client,
    quiet: false,
    noInfo: false,
    lazy: true,
    stats: { colors: true },
    proxy: {
      '/sap/zrest/*': 'http://aq1sapr3.emea.group.atlascopco.com:8075/'
    }
  }
}
