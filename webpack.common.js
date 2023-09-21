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

  resolve: {
    fallback: {
      path: require.resolve('path-browserify')
    }
  },

  optimization: {
    minimize: false
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
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer'],
                  ['cssnano']
                ]
              },
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './static/index.html'
    }),
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static/img',
          to: 'build/img'
        },
        {
          from: 'static/examples',
          to: 'build/examples'
        },
        {
          from: 'static/sounds',
          to: 'build/sounds'
        }
      ]
    })
  ]
}
