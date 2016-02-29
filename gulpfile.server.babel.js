//executed with gulp --gulpfile

require("babel-polyfill");
var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var notify  = require('gulp-notify');
var reload = require('browser-sync');
var rename = require('gulp-rename');
var duration = require('gulp-duration');
var browserify = require('browserify');

gulp.task('build', function() {	

return gulp.src('server.js')
        .pipe(babel())        
        .pipe(duration('rebuilding files'))
        .pipe(rename('serveres5.js'))
        .pipe(gulp.dest('./'));

// browserify({entries: 'server.js',debug: true})
// .transform(babelify)
// .bundle()
// .pipe(source('serveres5.js'))
// .pipe(duration('rebuilding files'))
// .pipe(gulp.dest('./'));
});

gulp.task('watchify', function(){
  var bundler = watchify(browserify(opts));

  function rebundle() {

    console.log('recreating bundle');

    return bundler.bundle()
    .on('error', notify.onError())
    .pipe(source('bundle.js'))
    .pipe(duration('rebuilding files'))
    .pipe(gulp.dest('dist'));      
  }

  bundler.transform(babelify).on('update', rebundle);

  return rebundle();
});

gulp.task('default', ['build'])