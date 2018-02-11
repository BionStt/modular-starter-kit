﻿'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('all.css');

const MODULE_PATH = path.resolve(__dirname, 'modules');
const WWWROOT_PATH = path.resolve(__dirname, 'wwwroot');
const NODE_PACKAGES_PATH = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: {
    bimonetary: path.resolve(__dirname, 'index.js'),
    vendors: [
      'jquery',
      'jquery-validation',
      'jquery-validation-unobtrusive',
      'bootstrap',
      'popper.js'
    ]
  },

  output: {
    path: WWWROOT_PATH,
    filename: '[name].js',
    library: '[name]_[hash]'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [MODULE_PATH],
        exclude: /(node_modules|wwwroot)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?|$)/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      { test: /\.(cshtml|txt)$/, loader: 'ignore-loader' }
    ]
  },

  plugins: [
    extractCSS,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: 'popper.js'
    })
  ],

  stats: {
    colors: true
  },

  devtool: 'source-map'
};
