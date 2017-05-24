const path = require('path')
const env = process.env.NODE_ENV || 'development'
const webpack = require('webpack')
const LANG = process.env.LANG || 'en-US'
const dist = path.join(__dirname, 'public')

module.exports = [
  {
    name: 'JS',
    devtool: 'source-map',
    entry: ['whatwg-fetch', path.join(__dirname, 'src', 'index.js')],
    output: {
      filename: path.join('public', 'build', 'bundle.js')
    },
    plugins: [
      new webpack.ProvidePlugin({
          "react": "React",
      })
    ],

    module: {
      loaders: [{
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: [
            /node_modules\//
          ],
          query: {
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react')
            ]
          }
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.svg$/,
          loader: 'babel-loader?presets[]=es2015,presets[]=react'
        }
      ]
    }
  }
]
