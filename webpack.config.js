const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const imagesRegex = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const fontsRegex = /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/;

// Presets for the babel loader
const babelPresets = [
  [
    'env',
    {
      targets: {
        browsers: ['last 2 versions']
      }
    }
  ],
  'react'
];

// JS / JSX Rules
const jsRules = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: babelPresets,
    // Don't read from .babelrc
    babelrc: false
  }
};

// GraphQL / GQL Rules
const gqlRules = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  use: 'graphql-tag/loader'
};

// SCSS Rules
const scssRules = {
  test: /\.(scss|css)/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true
        }
      },
      { loader: 'sass-loader' }
    ]
  })
};

// Images Rules
const imagesRules = {
  test: imagesRegex,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

// Fonts Rules
const fontsRules = {
  test: fontsRegex,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

const config = {
  entry: path.join(__dirname, 'src', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.gql', '.scss', '.pcss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: 'errors-only',
    open: true
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      inject: 'head',
      title: 'Meetup Topics',
      template: path.join(__dirname, 'static', 'index.html')
    })
  ],
  module: {
    rules: [jsRules, gqlRules, scssRules, imagesRules, fontsRules]
  }
};

module.exports = config;
