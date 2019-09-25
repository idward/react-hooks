const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./src/index.tsx', 'webpack-hot-middleware/client?reload=true&noInfo=true'],
  output: {
    filename: this.mode === 'production' ? '[name].[chunkhash].js' : '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          errorsAsWarnings: true,
        },
      },
      // {
      //   test: /\.(ts|tsx)$/,
      //   loader: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader',
      // },
      {
        test: /\.css$/,
        // include: path.resolve(__dirname, 'src'),
        use: [
          // { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-modules-typescript-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
              importLoaders: 2,
              sourceMap: true,
              // minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      // chunks: 'all',
      // maxInitialRequests: Infinity,
      // minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
          // name(module) {
          //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
          //   return `npm.${packageName.replace('@', '')}`;
          // },
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: true,
      dry: false,
      cleanAfterEveryBuildPatterns: ['dist/main.*.js', 'dist/mainfest.*.js'],
    }),
    new ForkTsCheckerWebpackPlugin({ eslint: true }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: './public/favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackMd5Hash(),
  ],
};
