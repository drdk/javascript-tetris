const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV || 'production';
const isProduction = (env === 'production');

const mode = isProduction ? 'production' : 'development';

function getPlugins() {
  return [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ];
}

module.exports = {
  mode,
  entry: path.resolve(__dirname, './'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js'
  },
  devtool: isProduction ? false : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  optimization: {
    minimize: isProduction
  },
  plugins: getPlugins()
}
