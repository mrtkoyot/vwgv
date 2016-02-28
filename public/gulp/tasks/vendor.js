'use strict';

var config = require('../config');
var gulp   = require('gulp');
var concat = require('gulp-concat');

// vendors
gulp.task('vendor', function() {

    return gulp.src([config.app + '/scripts/vendor/modernizr.js', config.app + '/scripts/vendor/modernizr-load.js'])
        .pipe( concat('vendor.js') )
        .pipe(gulp.dest(config.app + '/scripts/vendor/'));

});

gulp.task('vendor:dist', function() {

    return gulp.src([config.app + '/scripts/vendor/modernizr.js', config.app + '/scripts/vendor/modernizr-load.js'])
        .pipe( concat('vendor.js') )
        .pipe(gulp.dest(config.distTemplates + '/scripts/vendor/'));

});
