const webpack = require('webpack');
const config = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

config.module.rules.push({
  test: /\.less$/,
  use: [MiniCssExtractPlugin.loader, {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
      localIdentName: '[name]_[local]-[hash:base64:5]',
    },
  },
  {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
    },
  }],
  exclude: /node_modules/,
});
config.module.rules.push({
  test: /\.less$/,
  use: [MiniCssExtractPlugin.loader, {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    },
  },
  {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
    },
  }],
  exclude: /src/,
});

config.plugins.push(new webpack.DefinePlugin({
  API_URL: JSON.stringify('prod'),
}));

module.exports = config;
