const path = require('path');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const isProd = process.env.NODE_ENV === 'production';

const developmentOptions = {
  mode: 'development',
  devtool: isProd ? false : 'source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../src'),
    open: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader'],
      },
    ],
  },
};

module.exports = merge([common, developmentOptions]);
