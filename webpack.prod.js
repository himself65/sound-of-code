const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'source-map',

  mode: 'production',

  output: {
    publicPath: '/~myra/Temp/build/'
  },

  performance: {
    hints: false
  },

  plugins: [new CleanWebpackPlugin()]
})
