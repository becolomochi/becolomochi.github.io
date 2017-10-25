var gulp = require('gulp');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task('default', ['browser-sync'], function () {
  gulp.watch("./less/**/*.less", ['less']);
  gulp.watch("./**/*.html", ['bs-reload']);
  gulp.watch("./css/**/*.css", ['bs-reload']);
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      index: "index.html"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./css'));
});

gulp.task('pug', function () {
  return gulp.src('./pug/**/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug())
    .pipe(gulp.dest('./'));
});
