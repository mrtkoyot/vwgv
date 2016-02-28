'use strict';

var config      = require('../config');
var gulp        = require('gulp');

// Copy
gulp.task('copy', ['copy:templates', 'copy:js', 'copy:fonts', 'copy:config']);

gulp.task('copy:templates', function () {

    return gulp.src([
            config.app + '/**/*.inc',
            config.app + '/**/*.php',
            config.app + '/{,*/}*.html',
            config.app + '/{,*/}*.txt',
            config.app + '/!test'
        ], {base: '.'})
        .pipe(gulp.dest(config.dist));

});

gulp.task('copy:js', function () {

    return gulp.src(config.app + '/scripts/inline/*.js', {base: '.'})
        .pipe(gulp.dest(config.dist));

});

gulp.task('copy:fonts', function () {

    return gulp.src(config.app + '/styles/fonts/{,*/}*.*', {base: '.'})
        .pipe(gulp.dest(config.dist));

});

gulp.task('copy:config', function () {

    return gulp.src([
            '*.xml',
            '*.txt',
            '!htaccess.txt',
            '.htaccess',
        ], {base: '.'})
        .pipe(gulp.dest(config.dist));

});