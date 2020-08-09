const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '../src/index.ts'),

  output: {
    path: path.join(__dirname, '../dist'),
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.*'],
    alias: {
      '@/': path.join(__dirname, '../'),
    },
  },

  module: {
    rules: [
      {
        test: /\.t(s|sx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.s(c|a)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|jpeg|png)/,
        use: [
          {
            loader: 'img-loader',
          },
        ],
      },
      {
        test: /\.(svg|wav)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
    }),
  ],
};
