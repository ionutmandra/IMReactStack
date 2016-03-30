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

const scssPaths = ['./lib/**/*.scss', './scss/**/*.scss'];
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

gulp.task('sass', function() {
    return gulp.src(scssPaths)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', notify.onError()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ['watchify', 'sass'], function() {
    return gulp.watch(scssPaths, ['sass']);
});