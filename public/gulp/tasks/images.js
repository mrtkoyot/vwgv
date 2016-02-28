'use strict';

var config   = require('../config');
var path     = require('path');
var gulp     = require('gulp');
var cache    = require('gulp-cache');
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var rename   = require('gulp-rename');
var rev      = require('gulp-rev');
var size     = require('gulp-size');

// Images
gulp.task('images', function() {

    return gulp.src(config.app + '/images/**', {base: '.'})
        .pipe(imagemin())
        .pipe(gulp.dest(config.dist));

});
