var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var cssmin = require('gulp-cssmin');

gulp.task('default', ['browser-sync'], function () {
  gulp.watch("./less/**/*.less", ['less']);
  gulp.watch("./**/*.html", ['bs-reload']);
  gulp.watch("./css/**/*.css", ['bs-reload']);
});
gulp.task('browser-sync', function() {
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
