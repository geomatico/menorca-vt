const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = (env) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'inline-source-map',
  devServer: {
    open: true,
  },
  entry: env.test ? '' : {
    twinmaps: './src/twinmaps.js',
    expedients: './src/expedients.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|xml)$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
      },
    ],
  },
  plugins: env.test ? [] : [
    new HtmlWebPackPlugin({
      template: './src/template.html',
      filename: './twinmaps.html',
      chunks: ['twinmaps'],
    }),
    new HtmlWebPackPlugin({
      template: './src/template.html',
      filename: './expedients.html',
      chunks: ['expedients'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static',
        },
      ],
    }),
    new DotenvWebpackPlugin({
      safe: true
    })
  ],
});
