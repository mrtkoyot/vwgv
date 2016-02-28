'use strict';

var config      = require('../config');
var gulp        = require('gulp');

var sourcemaps  = require('gulp-sourcemaps');
var prefix      = require('gulp-autoprefixer');
var csso        = require('gulp-csso');
var sass        = require('gulp-sass');
var size        = require('gulp-size');

var browserify  = require('browserify');
var partialify  = require('partialify');

var debug       = require('gulp-debug');
var rename      = require('gulp-rename');
var RevAll      = require('gulp-rev-all');
var source      = require('vinyl-source-stream');
var del         = require('del');
var uglify      = require('gulp-uglify');
var runSequence = require('run-sequence');
var concat      = require('gulp-concat');

var fs          = require('fs');
var through     = require('through2');
var gutil       = require('gulp-util');
var log         = gutil.log;
var colors      = gutil.colors;




// Build
gulp.task('build', function() {

    runSequence('clean', 'copy', ['images', 'styles:build', 'scripts:build'], 'revreplace');

});


// Styles Dist
gulp.task('clean', function () {

    return del(['dist/**', '!dist']);

});


// Styles Dist
gulp.task('styles:build', function () {

    return gulp.src(config.app + '/styles/{*/,}*.scss', {base: '.'})
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())  // add vendor prefixes if necessary
        .pipe(csso())  // minify css
        .pipe(gulp.dest(config.dist));

});


// Script Dist
gulp.task('scripts:build', ['browserify:build', 'vendor:dist'], function() {

    return gulp.src([config.distTemplates + '/scripts/{*/,}*.js'])
        .pipe(uglify({
            mangle : true,
            preserveComments: false
        }))
        .pipe(gulp.dest(config.distTemplates + '/scripts/'));

});


// Browserify
gulp.task('browserify:build', function() {

    return browserify()
        .add('./' + config.app + '/scripts/init.js')
        .transform( partialify ) // Transform to allow requiring of templates
        .transform( babelify, {
            presets: ["es2015", "stage-2"]
        })  // allow ES2015
        .transform( vueify ) // allow vue to build from bundled modules
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.distTemplates + '/scripts/'));

});

gulp.task('revreplace', function(){

    var revAll = new RevAll({
        dontRenameFile : [
            'view-head.inc',
            'view-foot.inc',
        ],
        // may not need the below, but just incase
        dontSearchFile : [
            /^\/*.woff2$/g,
            /^\/*.woff$/g,
            /^\/*.ttf$/g,
            /^\/*.svg$/g,
            /^\/*.eot$/g,
            /^\/*.jpg$/g,
            /^\/*.png$/g,
            /^\/*.gif$/g,
            /^\/*.ico$/g,
        ],
    });

    gulp.src([
            config.distTemplates + '/scripts/{*/,}*.js',
            config.distTemplates + '/styles/{*/,}*.css',
            config.distTemplates + '/styles/fonts/**',
            config.distTemplates + '/images/**',
            config.distTemplates + '/views/{view-head,view-foot}.inc',
        ], {base: config.dist})
        .pipe(revAll.revision())
        .pipe(gulp.dest('dist'));

});
