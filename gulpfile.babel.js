import 'babel-polyfill';
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import watchify from 'watchify';
import notify from 'gulp-notify';
import duration from 'gulp-duration';
import change from 'gulp-change';
import runSequence from 'run-sequence';
import clean from 'gulp-clean';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import debug from 'gulp-debug';
import mocha from 'gulp-mocha';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
//import reload from 'browser-sync';


const opts = Object.assign({}, watchify.args, {
  entries: 'client/index.js',
});

gulp.task('watchify', () => {

  console.log('NODE_ENV is', process.env.NODE_ENV);

  opts.debug = !(process.env.NODE_ENV == 'production');

  console.log('browserify debug mode is ', opts.debug);

  let bundler = watchify(browserify(opts));
  bundler.transform(babelify).on('update', rebundle);
  return rebundle();

  function rebundle() {
    console.log('[' + (new Date().toTimeString().substring(0, 8)) + '] recreating bundle');
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(duration('rebuilding files'))
      .pipe(gulp.dest('./client/dist/js'));
  }
});

const vendor_files = [
  './client/lib/polyfill/*.js',
  './client/lib/jquery/jquery.min.js',
  './client/lib/jquery/jquery.scrollLock.js',   
  //'./client/lib/jquery/jquery.gray.js', 
  './client/lib/gsap/ColorPropsPlugin.min.js',
  './client/lib/gsap/ScrollToPlugin.min.js',
  './client/lib/gsap/CSSPlugin.min.js',
  './client/lib/gsap/TweenMax.js',
  './client/lib/scrollMagic/ScrollMagic.min.js',
  './client/lib/scrollMagic/animation.gsap.min.js',
  './client/lib/scrollMagic/debug.addIndicators.min.js',
];

gulp.task('vendor', () => {
  var piped = gulp.src(vendor_files)
    .pipe(concat('vendor.js'));
  
  if (process.env.NODE_ENV == 'production') {
    //piped.pipe(uglify());
  }

  return piped.pipe(gulp.dest('./client/dist/js'));
});

gulp.task('icomoon-variables', function () {
  return gulp.src(['./client/lib/icomoon/variables.scss'])
    .pipe(change(function (content) {
      return content.replace('$icomoon-font-path: "fonts" !default;', '$icomoon-font-path: "./../fonts" !default;');
    }))
    .pipe(gulp.dest('./client/lib/icomoon/'));
});

gulp.task('icomoon-fonts', function () {
  return gulp.src('./client/lib/icomoon/fonts/*')
    .pipe(gulp.dest('./client/dist/fonts'));
});

const scssPaths = ['./client/lib/**/*.scss', './client/scss/**/*.scss'];
const autoprefixerOptions = { browsers: ['last 2 versions', '> 0.1%', 'Firefox ESR'] };
gulp.task('sass', function () {
  var piped = gulp.src(scssPaths);

  if (process.env.NODE_ENV !== 'production') {
    piped = piped.pipe(sourcemaps.init());
  }

  piped = piped
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer(autoprefixerOptions))
    ;

  if (process.env.NODE_ENV !== 'production') {
    piped = piped.pipe(sourcemaps.write());
  }

  piped = piped.pipe(gulp.dest('./client/dist/css'));

  return piped;
});

gulp.task('app-sass', function (callback) {
  runSequence('icomoon-variables', 'icomoon-fonts', 'sass', callback);
});

const fontPaths = ['./client/assets/fonts/**'];
gulp.task('move-fonts', (callback) => {
    return gulp.src(fontPaths)
      .pipe(gulp.dest('./client/dist/fonts'));
});

const faviconPaths = ['./client/assets/favicon/**'];
gulp.task('move-favicon', (callback) => {
    return gulp.src(faviconPaths)
      .pipe(gulp.dest('./client/dist/favicon'));
});

const imagePaths = ['./client/assets/img/**'];
gulp.task('move-image-files', (callback) => {
    return gulp.src(imagePaths)
      .pipe(gulp.dest('./client/dist/img'));
});

// Due to photoswipe css we will add the needed images near the css
const photoSwipeimagePaths = ['./client/lib/photoswipe/default-skin.png', './client/lib/photoswipe/preloader.gif'];
gulp.task('move-photoswipe-files', (callback) => {
    return gulp.src(photoSwipeimagePaths)
      .pipe(gulp.dest('./client/dist/css'));
});


const libCssToTransform = ['./node_modules/react-photoswipe/dist/*.css'];
gulp.task('test', (callback) => {
    return gulp.src(libCssToTransform)
      .pipe(rename((path) => {
          path.basename = '_' +  path.basename;
          path.extname = '.scss';
      }))
      .pipe(gulp.dest('./client/lib/test'));
});

const scssPathsToWatch  = ['./client/lib/**/*.scss', './client/scss/**/*.scss'];
gulp.task('default', ['vendor', 'watchify', 'app-sass', 'move-fonts', 'move-favicon', 'move-image-files', 'move-photoswipe-files'], function() {
  gulp.watch(scssPathsToWatch, ['app-sass']);
});

gulp.task('clean', function () {
  return gulp.src('./client/dist', { read: false })
    .pipe(clean());
});
gulp.task('build', function () {

  console.log('NODE_ENV is', process.env.NODE_ENV);

  opts.debug = !(process.env.NODE_ENV == 'production');

  console.log('browserify debug mode is ', opts.debug);

  var bundler = browserify(opts)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'));

  if (process.env.NODE_ENV !== 'production') {

    console.log('extracting source maps for dev mode');

    bundler = bundler.pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'));
  }

  if (process.env.NODE_ENV === 'production') {
    console.log('uglifying');
    bundler = bundler.pipe(buffer()).pipe(uglify());
  }

  return bundler.pipe(duration('rebuilding files'))
    .pipe(gulp.dest('./client/dist/js'));
});

//PRODUCTION
gulp.task('minify-css', function () {
  return gulp.src('./client/dist/css/*.css')
    .pipe(debug({ title: 'Minifying css:' }))
    .pipe(cleanCSS({ compatibility: 'ie8' }, function (details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('./client/dist/css'));
});

gulp.task('apply-prod-environment', function () {
  //setting this value would make some changes in react code (https://facebook.github.io/react/downloads.html)
  process.env.NODE_ENV = 'production';
});

gulp.task('unit-tests', function () {
  //mocha src/test --reporter spec --compilers js:babel-register --recursive --watch
  return gulp.src('./client/test/*.js')
    .pipe(debug({ title: 'running tests:' }))
    .pipe(mocha(
      {
        compilers: 'js:babel-register',
      }));
});

gulp.task('deploy', function () {
  return runSequence('apply-prod-environment', 'clean', 'vendor', 'build', 'app-sass', 'move-fonts', 'move-favicon', 'move-image-files', 'move-photoswipe-files', 'minify-css', 'unit-tests');
});