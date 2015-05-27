var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

var PUB_DIR = './public';
var CSS_DIR = path.join(PUB_DIR, 'css');
var JS_DIR = path.join(PUB_DIR, 'js');
var IMG_DIR = path.join(PUB_DIR, 'img');

gulp.task('less', function() {
  return gulp
    .src(['./static/less/**.*'])
    .pipe(less())
    .pipe(gulp.dest(CSS_DIR));
});

gulp.task('default', ['less']);
