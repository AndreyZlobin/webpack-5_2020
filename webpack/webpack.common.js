const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const TerserPlugin = require('terser-webpack-plugin');
const Html = require('./Html');
const Entry = require('./Entry');

const PUBLIC_PATH = path.join(__dirname, '../public');

module.exports = {
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  entry: {
    ...Entry.create(),
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        globalStyle: {
          name: 'global',
          test: /.[\\/]globals[\\/]index.scss/,
        },
        nodeModules: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          enforce: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
    })],
  },
  plugins: [
    ...Html.create(),
    new SpriteLoaderPlugin({ plainSprite: true }),
    new CleanWebpackPlugin(),

  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [{
          resourceQuery: /^\?vue/,
          use: 'pug-plain-loader',
        }, {
          use: {
            loader: 'pug-loader',
            options: { pretty: true },
          },
        }],
      },
      { test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' },
      { test: /\.twig$/, use: { loader: 'twig-loader' } },
      {
        test: /fonts[\\/].+\.(eot|ttf|woff|woff2)$/,
        use: { loader: 'file-loader', options: { name: 'fonts/[name].[ext]' } },
      },
      {
        test: /(images|img|fonts)[\\\/].+\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
            /* =============== */
            outputPath: './assets/',
            publicPath: '../assets/',
            /* ================ */
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 70,
            },
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: [0.7, 0.7],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
          },
        }],
      },
      {
        test: /icons[\\\/].+\.svg$/i,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: '/assets/icons/icons.svg',
            },
          },
          {
            loader: path.resolve(__dirname, './svgClean.js'),
          },
        ],
      },
    ],
  },
};
