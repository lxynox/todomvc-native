var webpackConfig = require('./webpack.config.js')

delete webpackConfig.entry

// karma.conf.js
module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    // this is the entry file for all our tests.
    files: ['test/index.js'],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      'test/index.js': ['webpack']
    },

    browserConsoleLogOptions: {
      level: 'debug',
      terminal: true
    },

    // use the webpack config
    webpack: webpackConfig,
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true
  })
}
