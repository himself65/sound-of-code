const { merge } = require('webpack-merge')
const path = require('path')

const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'inline-source-map',

  mode: 'development',

  output: {
    publicPath: '/'
  },

  devServer: {
    compress: true,
    port: 3000,
    static: {
      directory: path.resolve(__dirname, 'static'),
      publicPath: '/',
      watch: true
    }
  }
})
