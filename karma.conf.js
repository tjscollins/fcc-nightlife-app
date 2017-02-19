const webpackConfig = require('./webpack.config.dev.js');

module.exports = function(config) {
  config.set({
    autowatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: [
      'mocha',
      'sinon',
    ],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'tests/client/**/*.test.jsx',
      'tests/client/**/*.test.js',
    ],
    preprocessors: {
      'tests/client/**/*.test.jsx': ['webpack', 'sourcemap'],
      'tests/client/**/*.test.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha'],
    client: {
      captureConsole: true,
      mocha: {
        bail: true,
        timeout: '5000',
      },
    },
    browserNoActivityTimeout: 100000,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
