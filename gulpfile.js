// VARIABLES
const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// FILE PATHS
const files = {
  scssSource: 'src/scss/**/*.scss',
  jsSource:'src/js/**/*.js',
  destination: 'dist',
  compiledCssDest: 'dist/style.css',
  minifiedCssDest: 'dist/minified_version/'
}

/* || SASS Task
- split into two functions:
1. compile into css
2. add vendor prefixes and minify css
*/
function scssCompiler(){
  return src(files.scssSource, {sourcemaps: true})
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([autoprefixer('last 2 versions')]))
  .pipe(dest(files.destination, {sourcemaps: '.'}))
  .pipe(browserSync.stream());
}

function scssMinify(){
  return src(files.compiledCssDest, {sourcemaps: true})
  .pipe(postcss([cssnano()]))
  .pipe(dest(files.minifiedCssDest));
}


/* || JavaScript Task
- split into two functions:
1. c
*/
function jsTerser(){
  return src(files.jsSource, {sourcemaps: true})
  .pipe(concat('all.js'))
  .pipe(terser())
  .pipe(dest(files.destination, {sourcemaps: '.'}));
}

// Cachebusting Task
const cbString = new Date().getTime();
function cacheBusting() {
  return src(['index.html'])
  .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
  .pipe(dest('.')
  );
}

// Browsersync Task
function browserSyncServer(callback) {
  browserSync.init({
    server: {
      baseDir: '.'
    }, browser: ['chrome', 'firefox', 'msedge']
  });
  callback();
}

function browserSyncReload(callback) {
  browserSync.reload();
  callback();
}

//Watch Task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch([files.scssSource, files.jsSource], series(scssCompiler, jsTerser, browserSyncReload));
}



// Gulp
exports.default = series(
  parallel(scssCompiler, jsTerser),
  scssMinify,
  cacheBusting,
  browserSyncServer,
  watchTask,
);

