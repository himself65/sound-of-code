const merge = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'inline-source-map',

  mode: 'development',

  output: {
    publicPath: '/'
  },

  devServer: {
    compress: true,
    contentBase: './dist',
    port: 3000
  }
})
