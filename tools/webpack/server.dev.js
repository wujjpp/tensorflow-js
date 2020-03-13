/**
 * Created by Wu Jian Ping on 2017/3/20.
 */

import webpack from 'webpack'
import path from 'path'
import serverSharedConfig from './server.shared'
import marked from 'marked'
import CircularDependencyPlugin from 'circular-dependency-plugin'

const renderer = new marked.Renderer()

export default Object.assign({}, serverSharedConfig, {
  mode: 'development',
  // devtool: 'eval-source-map',
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    unsafeCache: true
  },

  module: {
    noParse: function (content) {
      return /lodash/.test(content)
    },
    unsafeCache: true,
    rules: [{
      test: /\.(js)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: './.cache/babel-loader',
            compact: false
          }
        },
        {
          loader: 'eslint-loader'
        }
      ],
      include: [path.join(process.cwd(), 'src')]
    },

    // {
    //   test: /\.vue$/,
    //   use: [{
    //     loader: 'babel-loader',
    //     options: {
    //       cacheDirectory: './.cache/babel-loader'
    //     }
    //   }, {
    //     loader: 'vue-loader'
    //   }]
    // },

    {
      test: /\.(scss|less|css)$/i,
      use: ['null-loader']
    },

    {
      test: /\.(ico|gif|png|jpg|jpeg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          emitFile: false
        }
      }]
    },

    {
      test: /\.(webp|mp4|webm|wav|mp3|m4a|aac|oga)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          emitFile: false
        }
      }]
    },

    {
      test: /\.(woff2?|ttf|eot|svg)(\?[\s\S])?$/i,
      use: [{
        loader: 'file-loader',
        options: {
          emitFile: false
        }
      }]
    },

    {
      test: /\.md$/,
      use: [{
        loader: 'html-loader'
      },
      {
        loader: 'markdown-loader',
        options: {
          pedantic: true,
          renderer
        }
      }
      ]
    }
    ]
  },

  externals: [
    (context, request, callback) => {
      const isExternal =
        // the module name start with ('@' or 'a-z') character and contains 'a-z' or '/' or '.' or '-' or '0-9'
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) && !request.match(/\.(css|less|scss)$/i)
      // environment config file, auto generated during build
      // console.log(request + '--------' + Boolean(isExternal))

      callback(null, Boolean(isExternal))
    }
  ],

  plugins: [
    new webpack.DefinePlugin({
      __BROWSER__: false
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install()',
      raw: true,
      entryOnly: false
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

    new CircularDependencyPlugin({
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    })
  ],

  // stats: 'minimal'
  stats: {
    colors: true,
    warnings: true
  }
})
