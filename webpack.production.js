const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  // TODO: .browserrslistrc 파일로 대체
                  {
                    targets: 'defaults',
                  },
                ],
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
                '@babel/preset-typescript',
              ],
              plugins: [
                'babel-plugin-transform-typescript-metadata',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
              ],
            },
          },
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      prefix: 'import.meta.env.',
    }),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
};
