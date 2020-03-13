/**
 * Created by Wu Jian Ping on 2017/3/20.
 */

import webpack from 'webpack'
import path from 'path'
import serverSharedConfig from './server.shared'
import marked from 'marked'
import TerserPlugin from 'terser-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'

const renderer = new marked.Renderer()

export default Object.assign({}, serverSharedConfig, {
  mode: 'production',

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.vue', '.json']
  },

  module: {
    rules: [{
      test: /\.js$/i,
      use: ['babel-loader', 'eslint-loader'],
      include: [path.join(process.cwd(), 'src')]
    },

    // {
    //   test: /\.vue$/,
    //   use: ['babel-loader', 'vue-loader']
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
          name: '[name]-[hash:8].[ext]',
          emitFile: false
        }
      }]
    },
    {
      test: /\.(webp|mp4|webm|wav|mp3|m4a|aac|oga)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:8].[ext]',
          emitFile: false
        }
      }]
    },
    {
      test: /\.(woff2?|ttf|eot|svg)(\?[\s\S])?$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:8].[ext]',
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
    }]
  },

  externals: [
    /^\.\/assets.json$/,
    (context, request, callback) => {
      const isExternal =
        // the module name start with ('@' or 'a-z') character and contains 'a-z' or '/' or '.' or '-' or '0-9'
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) && !request.match(/\.(css|less|scss)$/i)
      // environment config file, auto generated during build
      callback(null, Boolean(isExternal))
    }
  ],

  plugins: [
    new webpack.DefinePlugin({
      __BROWSER__: false
    }),

    new webpack.BannerPlugin({
      banner: 'require(\'source-map-support\').install();process.env.NODE_ENV=\'production\';',
      raw: true,
      entryOnly: true
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

  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false
        }
      })
    ]
  },

  stats: {
    colors: true,
    warnings: true
  }
})
