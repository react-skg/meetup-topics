const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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

const cssRules = {
  test: '',
  use: [
    {
      loader: '',
      options: {}
    }
  ]
};

// SCSS Rules
const scssRules = {
  test: /\.scss/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader'
        // options: {
        //   minimize: !config.LOCAL
        // }
      },
      { loader: 'sass-loader' }
    ]
  })
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
    rules: [jsRules, gqlRules, scssRules]
  }
};

module.exports = config;
