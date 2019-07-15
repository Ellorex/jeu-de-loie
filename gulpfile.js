'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassSrc = './static/assets/sass/main.scss';

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src(sassSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./static/dist/css'));
});