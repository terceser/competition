// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
const { chromium, firefox } = require('playwright');

// process.env.CHROME_BIN = chromium.executablePath();
// process.env.FIREFOX_BIN = firefox.executablePath();

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcov', 'cobertura'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    concurrency: 1, // avoid clash when ffox and chrome run at the same time
    autoWatch: false,
    browsers: ['ChromeHeadlessNoSandbox', 'FirefoxHeadless'],
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--disable-gpu',
          '--no-sandbox', // run without privileges
          '--disable-dev-shm-usage' // disable usage of /dev/shm https://github.com/karma-runner/karma-chrome-launcher/issues/154
        ]
      },
      FirefoxHeadless: {
        // when firefox headless crash, we should re-configure our kubernetes/docker container with --shm-size flag
        // https://github.com/karma-runner/karma-firefox-launcher/issues/104
        base: 'Firefox',
        flags: ['-headless']
      }
    },
    singleRun: true
  });
};
