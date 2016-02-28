'use strict';

var config               = require('../config');

var gulp                 = require('gulp');
var sourcemaps           = require('gulp-sourcemaps');
var prefix               = require('gulp-autoprefixer');
var csso                 = require('gulp-csso');
var sass                 = require('gulp-sass');
var size                 = require('gulp-size');
var debug                = require('gulp-debug');
var rename               = require('gulp-rename');

var browserSync          = require('browser-sync').create();

var webpack              = require('webpack');
var webpackConfig        = require('../webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var compiler             = webpack(webpackConfig);

var source               = require('vinyl-source-stream');


gulp.task('serve', ['styles', 'vendor', 'watch'], function () {

    browserSync.init({

        browser: "google chrome",

        proxy: {

            target: "thebigsurf.dev",

            middleware: [

                webpackDevMiddleware(compiler, {

                    // IMPORTANT: dev middleware can't access config, so we should
                    // provide publicPath by ourselves
                    publicPath: '/site/templates/scripts/',

                    stats: {
                        colors: true,
                        chunks: false
                    }

                    // for other settings see
                    // http://webpack.github.io/docs/webpack-dev-middleware.html

                }),

                // compiler should be the same as above
                webpackHotMiddleware(compiler)

            ]

        },

    });

});


// Styles
gulp.task('styles', function () {

    return gulp.src(config.app + '/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())  // add vendor prefixes if necessary
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.app + '/styles/'))
        .pipe(size())
        .pipe( browserSync.stream({
            match: '**/*.css'
        })
    );

});


// Watch
gulp.task('watch', function () {

    // Watch for changes in `app` folder
    gulp.watch([
        config.app + '/**/*.php',
        config.app + '/**/*.inc',
        config.app + '/images/**/*'
    ]).on('change', browserSync.reload);

    // Watch .sass files
    gulp.watch(config.app + '/styles/**/*.scss', ['styles']);

});