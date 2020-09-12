const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.js')
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')(), require('cssnano')()],
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({ template: './static/index.html' }),
    new HtmlWebpackPlugin({
      filename: 'sonify/index.html',
      template: './static/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'preferences/index.html',
      template: './static/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'about/index.html',
      template: './static/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'resources/index.html',
      template: './static/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: '**/*',
        context: 'static/'
      }
    ])
  ]
}
