import "babel-polyfill";
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
import watchify from 'watchify';
import notify from 'gulp-notify';
import reload from 'browser-sync';
var duration = require('gulp-duration');

const scssPaths = ['./lib/**/*.scss', './scss/**/*.scss'];

const customOpts = {entries: 'src/index.js',debug: true};
const opts = Object.assign({}, watchify.args, customOpts);

gulp.task('watchify', () => {
  let bundler = watchify(browserify(opts));

  function rebundle() {

  console.log('['+(new Date().toTimeString().substring(0, 8))+'] recreating bundle');

    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source('bundle.js'))
      .pipe(duration('rebuilding files'))
      .pipe(gulp.dest('./dist/js'));      
  }

  bundler.transform(babelify).on('update', rebundle);

  return rebundle();
});

gulp.task('sass', function () {
  return gulp.src(scssPaths)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ['watchify', 'sass'], function(){
  return gulp.watch(scssPaths, ['sass']);
});