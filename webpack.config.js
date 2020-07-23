const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    port: 1337
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
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[path][name].[ext]`,
            },
          }
        ]
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/style.css`
    }),
  ],

  devtool: 'source-map'
};
