const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.common.js');

module.exports = Merge(CommonConfig, {
  devtool: 'eval-source-map',
  plugins: [
    // Define NODE_ENV in case it`s used somewhere else
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
