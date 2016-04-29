import "babel-polyfill";
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import watchify from 'watchify';
import notify from 'gulp-notify';
import reload from 'browser-sync';
import duration from 'gulp-duration';
import change from 'gulp-change';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';

const opts = Object.assign({}, watchify.args, {
  entries: 'src/index.js',
  debug: true,
});

gulp.task('watchify', () => {
  let bundler = watchify(browserify(opts));
  bundler.transform(babelify).on('update', rebundle);
  return rebundle();

  function rebundle() {
    console.log('[' + (new Date().toTimeString().substring(0, 8)) + '] recreating bundle');
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source('bundle.js'))
      .pipe(duration('rebuilding files'))
      .pipe(gulp.dest('./dist/js'));
  }
});

gulp.task('icomoon-variables', function() {
  return gulp.src(['./icomoon/variables.scss'])
    .pipe(change(function(content){
      return content.replace('$icomoon-font-path: "fonts" !default;', '$icomoon-font-path: "./../fonts" !default;')
    }))
    .pipe(gulp.dest('./icomoon/'));
});

gulp.task('icomoon-fonts', function() {
  gulp.src('./icomoon/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});

const scssPaths = ['./lib/**/*.scss', './scss/**/*.scss'];
gulp.task('sass', function() {
  gulp.src(scssPaths)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('app-sass', function(callback){
  runSequence('icomoon-variables','icomoon-fonts', 'sass', callback);
});

const scssPathsToWatch  = ['./lib/**/*.scss', './scss/**/*.scss','./icomoon/*'];
gulp.task('default', ['watchify', 'app-sass'], function() {
  gulp.watch(scssPathsToWatch, ['app-sass']);
});
