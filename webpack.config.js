const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mockData = require('./src/data/mock.json');

const isProd = process.env.NODE_ENV === `production`;

module.exports = {
  entry: {
    bundle: `./src/index.js`
  },

  output: {
    filename: `js/bundle.js`,
    path: path.join(__dirname, `build`)
  },

  devServer: {
    contentBase: path.join(__dirname, `build`),
    compress: false,
    open: false,
    host: 'localhost',
    port: 1337,
    before: function (app) {
      app.post('/data/mock.json', function (req, res) {
        res.send(mockData);
      });
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      },
      {
        test: /\.s?css$/i,
        exclude: /node_modules/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : `style-loader`,
          `css-loader`,
          {
            loader: `postcss-loader`,
            options: {
              plugins: [require("autoprefixer")]
            }
          },
          `sass-loader`
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          `svg-url-loader`
        ],
      },
      {
        test: /\.(woff2?|eot|[ot]tf)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `fonts/[name].[ext]`,
              publicPath: `../`
            }
          }
        ]
      },
      {
        test: /\.json$/i,
        exclude: /node_modules/,
        type: 'javascript/auto',
        loader: 'file-loader',
        options: {
          name: 'data/[name].json'
        }
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/style.css`
    }),

    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    }),
  ],

  devtool: isProd ? false : 'source-map'
};
