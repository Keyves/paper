const webpackConfig = require('./webpack/test')

module.exports = function(config) {
	config.set({
		basePath: '.',
		logLevel: config.LOG_INFO,
		port: 9999,
		colors: true,
		frameworks: ['jasmine'],
		files: [
			'test/index.ts'
		],
		preprocessors: {
			'src/**': ['webpack', 'sourcemap', 'coverage'],
			'test/**': ['webpack', 'sourcemap']
		},
		plugins: [
			'karma-webpack',
			'karma-jasmine',
			'karma-sourcemap-loader',
			'karma-chrome-launcher',
			'karma-coverage',
			'karma-mocha-reporter'
		],
		browsers: ['ChromeHeadless'],
		reporters: ['mocha', 'coverage', 'dots'],
		coverageReporter: {
			dir: 'coverage',
			reporters: [{
				type: 'json',
				subdir: '.',
				file: 'coverage.json'
			}, {
				type: 'lcov',
				subdir: '.'
			}, {
				type: 'text-summary'
			}]
		},
		webpack: webpackConfig,
		webpackServer: {
			noInfo: true
		},
        mime: {
            'text/x-typescript': ['ts']
        }
	})
}
