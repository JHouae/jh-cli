const webpack = require('webpack');
const config = require('./webpack.config');

config.module.rules.push({
  test: /\.less$/,
  use: [
    {
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[local]--[hash:base64:5]',
      },
    }, {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      },
    },
  ],
  exclude: /node_modules/,
});
config.module.rules.push({
  test: /\.less$/,
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
  }, {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
    },
  }],
  exclude: /src/,
});

config.devServer = {
  inline: true,
  port: 8303,
  open: false,
  hot: true,
  compress: true,
  clientLogLevel: 'none',
};
config.devtool = 'source-map';
config.plugins.push(
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    API_URL: JSON.stringify('dev'),
  }),
);

module.exports = config;

