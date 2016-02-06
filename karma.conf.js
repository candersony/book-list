// Karma configuration

module.exports = function(config) {
  config.set({

    basePath: '',
    port: 9876,
    frameworks: [
      'jasmine-ajax',
      'jasmine'
    ],
    colors: true,
    logLevel: config.LOG_DEBUG, // LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    autoWatch: true,
    singleRun: true,
    browsers: [
      'Chrome'
    ],
    reporters: [
      'progress'
    ],

    files: [
      'test/**/*.spec.js'
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-jasmine-ajax'
    ]
  })
};
