'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');


// Dist
gulp.task('dist', function() {

    runSequence( 'build', ['scripts:dist', 'styles:dist'], 'watch:dist', 'sync:dist' );

});


// Sync
gulp.task('sync:dist', function() {

    browserSync.init({
        proxy  : "http://www.supertubes.dev/?gulp=dist",
        browser: "google chrome"
    });

});


// Styles
gulp.task('styles:dist', function () {

    return gulp.src(config.distTemplates + '/styles/')
        .pipe( browserSync.stream() );

});


// Browserify
gulp.task('scripts:dist', function() {

    return gulp.src(config.distTemplates + '/scripts/')
        .pipe( browserSync.stream() );

});


// Watch
gulp.task('watch:dist', function () {

    // Watch for changes in `app` folder
    gulp.watch([
        config.app + '/**/*.php',
        config.app + '/**/*.inc',
        config.app + '/images/**/*'
    ]).on('change', browserSync.reload);

    // Watch .sass files
    gulp.watch(config.app + '/styles/**/*.scss', ['styles:build']);

    // Watch .js files
    gulp.watch([
        config.app + '/scripts/**/*.js',
        '!**/supertubes.js'
    ], ['browserify:build']);

});
