import "babel-polyfill";
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
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
      .pipe(gulp.dest('dist'));      
  }

  bundler.transform(babelify).on('update', rebundle);

  return rebundle();
});

gulp.task('sass', function () {
  return gulp.src(scssPaths)
    .pipe(sass().on('error', notify.onError()))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['watchify', 'sass'], function(){
  return gulp.watch(scssPaths, ['sass']);
});

// gulp.task('build', function() {  
//    browserify(opts)
//   .transform(babelify)
//   .bundle()
//   .pipe(source('bundle.js'))
//   .pipe(duration('rebuilding files'))
//   .pipe(gulp.dest('dist'));
// });