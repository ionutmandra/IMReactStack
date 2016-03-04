import "babel-polyfill";
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
import watchify from 'watchify';
import notify from 'gulp-notify';
import reload from 'browser-sync';
var duration = require('gulp-duration');

const customOpts = {entries: 'src/index.js',debug: true};

const opts = Object.assign({}, watchify.args, customOpts);

gulp.task('build', function() {	
   browserify(opts)
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(duration('rebuilding files'))
  .pipe(gulp.dest('dist'));
});

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

gulp.task('default', ['watchify'])