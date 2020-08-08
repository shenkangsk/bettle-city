const merge = require('webpack-merge').default;
const baseConfig = require('./webpack.config');

console.log(merge);
module.exports = merge(baseConfig, {
  devServer: {
    port: 10001
  }
})