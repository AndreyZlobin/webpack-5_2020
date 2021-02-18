const Webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const common = require('./webpack.common.js');

const PUBLIC_PATH = path.join(__dirname, '..', 'public', 'assets');

const buildOptions = {
  mode: 'production',
  devtool: false,
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: false,
    modules: false,
    children: false,
  },
  performance: {
    hints: 'warning',
  },
  bail: true,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    publicPath: './',
  },
  plugins: [

    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new WebpackManifestPlugin(),
    new AssetsPlugin({
      filename: 'assets.json',
      path: PUBLIC_PATH,
      prettyPrint: true,
      entrypoints: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[name].[chunkhash:8].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { config: path.resolve(__dirname, '../postcss.config.js') },
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};

module.exports = merge([common, buildOptions]);
