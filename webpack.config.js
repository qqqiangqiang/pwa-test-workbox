const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  watch: true,
  mode: 'production',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        exclude: file => {
          return /node_modules/.test(file) && !/view-design/.test(file);
        },
        use: {
          loader: 'babel-loader',
          options: {}
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff|woff2|eot)$/,
        loaders: ['url-loader?limit=10240&name=css/images/[name].[ext]'],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'mock', to: 'mock' },
      ],
    }),
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: 'index.[hash:8].css',
      chunkFilename: '[id].css',
    }),
    new GenerateSW({
      importWorkboxFrom: 'disabled',
      importScripts: 'https://statics.itc.cn/mp/mp-new/wap/workbox-v4.3.1/workbox-sw.js',
      skipWaiting: true,
      clientsClaim: true,
      exclude: new RegExp('mock'),
      runtimeCaching: [
        {
          urlPattern: new RegExp('mock'),
          handler: 'networkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 5,
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'test.html'
    })
  ]
}