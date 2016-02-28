'use strict';

var config = require('../config');
var gulp   = require('gulp');
var jshint = require('gulp-jshint');

// JSHint
gulp.task('jshint', function () {

	return gulp.src(config.app + '/scripts/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(require('jshint-stylish')));

});
