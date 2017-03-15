const path = require('path')
const rootDir = require('app-root-dir')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const config = require('../../config')
const isDev = config.isDev
const isProd = config.isProd


const clientConfig = {
  entry: {
    client: [
      path.resolve(rootDir.get(), 'src', 'client', 'index')
    ],
    vendor: [
      'vue',
      'vuex',
      'vue-router',
      'vuex-router-sync',
      'vue-meta'
    ]
  },
  output: {
    path: path.resolve(rootDir.get(), 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
      test: /\.(png|jpg|gif|svg|woff2?|ttf|svg|eot)$/,
      loader: 'url-loader',
      options: {
        limit: 100,
        name: '[name].[hash].[ext]'
      }
    }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['[client]'],
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"client"',
        CLIENT_BUILD: true,
        SSR_BUILD: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new HtmlPlugin({
      template: path.resolve(rootDir.get(), 'src', 'client', 'index.template.html'),
      filename: 'index.template.html'
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },

}

// dev config
if (isDev) {
  // entry
  clientConfig.entry.client.unshift('webpack-hot-middleware/client')

  // plugins
  clientConfig.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['[client]'],
      }
    })
  )
  // Just use the name so HMR doesn't get confused.
  clientConfig.output.filename = '[name].bundle.js'
  // devtool
  clientConfig.devtool = 'inline-source-map'
} else {
  // add a hash for cash busting.
  clientConfig.output.chunkFilename = '[name]-[chunkhash].js'
  clientConfig.output.filename = '[name].[hash].bundle.js'
}

module.exports = clientConfig
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const baseConfig = require('./base.config')
// const path = require('path')
// const rootDir = require('app-root-dir')
// const webpack = require('webpack')
// const { isDev, isProd } = require('../../config')

// const clientConfig = Object.assign({}, baseConfig, {
//   entry: Object.assign({}, baseConfig.entry, {
//     client: [
//       path.resolve(rootDir.get(), 'src', 'client', 'index')
//     ]
//   }),
//   output: Object.assign({}, baseConfig.output, {
//     path: path.resolve(rootDir.get(), 'dist', 'client')
//   }),
//   plugins: (baseConfig.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
//         VUE_ENV: '"client"',
//         CLIENT_BUILD: true,
//         SSR_BUILD: false
//       }
//     }),
//   ])
// })

// if (isDev) {
//   clientConfig.entry.client.unshift('webpack-hot-middleware/client')

//   clientConfig.plugins.unshift(
//     new FriendlyErrorsWebpackPlugin({
//       compilationSuccessInfo: {
//         messages: ['[client]'],
//       }
//     })
//   )
// }