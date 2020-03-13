# SPA Vue

Spa Vue is an opinionated boilerplate for web
development built on top of [Node.js](https://nodejs.org/),
[Express](http://expressjs.com/) and
[Vue 2](https://vuejs.org/), containing modern web development
tools such as [Webpack 4](http://webpack.github.io/), [Babel 7](https://babeljs.io/)
and [Browsersync](http://www.browsersync.io/). Helping you to stay productive
following the best practices. A solid starting point for both professionals
and newcomers to the industry.

[![Build Status](http://gitlab.greatld.com:14444/starter-kits/spa-vue/badges/master/build.svg)](http://gitlab.greatld.com:14444/starter-kits/spa-vue/commits/master)

## Features

- [Vue 2](https://vuejs.org/)
- [Webpack 4](https://webpack.js.org/)
- [Babel 7](https://babeljs.io/)
- Support client live reload
- Supports server auto compile and restart
- Support [less](http://lesscss.org/), [sass](https://sass-lang.com/)

## How to Install

```shell
$ git clone http://gitlab.greatld.com:14444/starter-kits/spa-vue/spa-vue.git
$ cd spa-vue
$ npm install
```

## How to Run and Build

### Run

```shell
$ npm start
 ```

### Build

```shell
$ npm run build
```

### Run in dist

```shell
$ npm run start:dist
```

### About CDN

Sometimes, we should host our static files(js,css,image and etc) in CDN, for this case you should change seetings in  `/cdn_config.js`,
for example: if our CDN root is `http://cache.mycdn.com/`, change `//cache.YourCDN.com` to `//cache.mycdn.com`

___/cdn_settings.js___

```javascript
export default {
  dev: {
    publicPath: '/'
  },

  sit: {
    publicPath: '//sitcache.mycdn.com/'
  },

  uat: {
    publicPath: '//uatcache.mycdn.com/'
  },

  prod: {
    publicPath: '//cache.mycdn.com/'
  }
}

```

then use the following command for building, after built, upload the `/build/public` folder to CDN,  thats all.

```shell
$ npm run build -- prod
```

NOTE: double dashes are required and there is a `blank` between `--` and `prod`

## About complie enviroment

We defined 2 parameters for identity complie enviroment

___/tools/webpack/client.build.js___

```javascript
...
plugins: [
  new webpack.DefinePlugin({
    '__BROWSER__': true,
    '__DEV__': false
  }),
  ...
]  
...
```

You can use this 2 options in your code for condition compiling,

For example: In `/src/routes/test/app-main/component.js`, we use `__BROWSER__` to tell compiler `jquery.easypiechart` and `toastr` only built for BROWSER, actually it is useless and cannot be used in node enviroment.

```javascript
if (__BROWSER__) {
  require('easy-pie-chart/dist/jquery.easypiechart')
  require('toastr/toastr.scss')
  var toastr = require('toastr')
}

export default class Test {
  onMount() {
    $('.chart').easyPieChart({
      easing: 'easeOutBounce',
      onStep: function(from, to, percent) {
        $(this.el).find('.percent').text(Math.round(percent));
      }
    });
```

## Analyse webpack stats

We have integrated tools for analysing bundled file, after run `npm run build`, try to type the following command in your terminal.

```shell
$ npm run analyse:client
```

```shell
$ npm run analyse:server
```

```shell
$ npm run analyse
```

## About Browsersync

Navigate to [http://localhost:3001](http://localhost:3001) to open Browsersync control panel

## Directory Layout

```shell
.
├── /public/                     # Static files which are copied into the /build/public folder
├── /src/                        # The source code of the application
│   ├── /components/             # Top level marko components
│   ├── /core/                   # Core module or utility library
│   ├── /layouts/                # Layout marko
│   ├── /routes/                 # Routes or pages
│   │   ├── /home/               # Example home page
│   │   │   ├── /components      # Page level compoment
│   │   │   ├── /images          # Page level images
│   │   │   ├── client.js        # Entry of client script
│   │   │   ├── index.js         # Router for server side
│   │   │   └── layout.marko     # Page template marko
│   │   └── /xxxx/               # xxxx page
│   ├── /styles/                 # Global stylesheets
│   ├── /vendor/                 # Customised third-party library
│   ├── /assets-loader.js        # Loader for loading assets.json
│   └── /server.js               # Express server app
├── /tests/                      # Unit and end-to-end tests
├── /tools/                      # Build automation scripts and utilities
│   ├── /analyse/                # analyse tools for webpack stats
│   ├── /libs/                   # Library for build system
│   ├── /loaders/                # Custom webpack loader
│   ├── /plugins/                # Custom webpack plugin
│   ├── /webpack/                # Webpack config files
│   ├── /build-client.js         # Scripts for build client app
│   ├── /build-server.js         # Scripts for build server app
│   ├── /build.js                # Scripts for build client and server
│   ├── /clean.js                # Cleans up for the output (build) folder
│   ├── /config.js               # Build config file
│   ├── /copy.js                 # Copy package.json, public folder and assets.json
│   ├── /post.config.js          # Configuration for transforming styles with PostCSS
│   ├── /run.js                  # Helper function for running build automation tasks
│   ├── /start.js                # Launches the development web server with "live reload"
│   └── /watch.js                # watch public folder, if changed copy files to dist/public folder
└── package.json                 # The list of 3rd party libraries and utilities
└── entry-settings.js            # Configure client entry for built
```

## How to Update

```shell
$ git checkout master
$ git pull origin master
$ npm install
```

Made with ♥ by Wu Jian Ping
