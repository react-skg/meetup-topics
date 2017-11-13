/**
 * Eslint Configuration
 */

//--- Rules Settings ---
const OFF = 0;
const WARN = 1;
const ERROR = 2;

//--- Rules Configuration ---
module.exports = {
  // Extend preset configurations
  extends: 'airbnb',
  plugins: ['import'],
  // Use babel to parse JS new features
  parser: 'babel-eslint',

  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js'
      }
    }
  },

  env: {
    jest: true
  },

  // Overide preset rules with our own
  rules: {
    // Do not require a trailing comma
    "comma-dangle": ["error", "never"],
    'class-methods-use-this': OFF
  }
};