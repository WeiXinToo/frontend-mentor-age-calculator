# Gulp & BrowserSync - SASS Compiler

## check version of node and npm
- node -v: check for node version
- npm -v: check for nodejs package manager (npm) version

## Installing gulp (2 part)
1.  install gulp command line interface (cli)
npm install gulp-cli -g
- -g means installing globally, allowing us to use gulp command from the command line in any directory of our pc.


2.  create package.json file
npm init -y
- -y means answering yes to all the default questions

3. install packages
npm install --save-dev gulp gulp-sass gulp-postcss cssnano gulp-terser browser-sync

4. create gulpfile.js and write the following codes and save.

```js
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
  // 1. where is our scss source?
  return src(files.scssSource, {sourcemaps: true})
  // 2. pass source through compiler
  .pipe(sass().on('error', sass.logError))
  // 3. add vendor prefixes
  .pipe(postcss([autoprefixer('last 2 versions')]))
  // 4. where is our destination?
  .pipe(dest(files.destination, {sourcemaps: '.'}))
  // 5. inject changes without refreshing the page, keep scroll position intact and never take you back to top.
  .pipe(browserSync.stream());
}

function scssMinify(){
  // 1. where is the compiled version of css?
  return src(files.compiledCssDest, {sourcemaps: true})
  // 2. minify compiled css
  .pipe(postcss([cssnano()]))
  // 3. where is the destination?
  .pipe(dest(files.minifiedCssDest));
}


/* || JavaScript Task*/
function jsTerser(){
  // 1. where is the js source?
  return src(files.jsSource, {sourcemaps: true})
  // 2. concatenate all js into one file called all.js
  .pipe(concat('all.js'))
  // 3. minify js
  .pipe(terser())
  // 4. where is the destination?
  .pipe(dest(files.destination, {sourcemaps: '.'}));
}

/* || Cachebusting Task
- prevent browser from caching old files, not loading the latest files.
- adding query string (?xxx=...) to force browser to reload the most recent version of a file every time.
*/
// 1. initiate a variable with current time as value
const cbString = new Date().getTime();
function cacheBusting() {
  // 2. where is the html source?
  return src(['index.html'])
  // 3. replace value of query string (...?cb=...)
  .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
  // 4. where is the destination?
  .pipe(dest('.')
  );
}

/* || Browser Sync Task
- set up server
- reload sever

*/
function browserSyncServer(cb) {
  // 1. initialize server
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  // 2. callback - signify completed.
  cb();
}

function browserSyncReload(cb) {
  // 1. reload server
  browserSync.reload();
  // 2. callback - signify completed.
  cb();
}

/* || Watch Task
watch for changes to files that match the globs and execute tasks when changes happen.
*/
function watchTask() {
  // 1. watch html - run reload when changes happen.
  watch('*.html', browserSyncReload);
  // 2. watch scss and js - run reload when changes happen.
  watch([files.scssSource, files.jsSource], series(scssCompiler, jsTerser, browserSyncReload));
}



/* || Gulp
- type gulp in command line to run all the functions.
- run tasks step by step.
- parallel(task1, task2) = run in parallel

*/
exports.default = series(

  parallel(scssCompiler, jsTerser),
  scssMinify,
  cacheBusting,
  browserSyncServer,
  watchTask,
);


```
5. enter 'gulp' in terminal to run.



## Note: Vulnerability issues with installed npm packages.
### npm audit report to be resolved.

```cml
glob-parent  <5.1.2
Severity: high
glob-parent vulnerable to Regular Expression Denial of Service in enclosure regex - https://
fix available via `npm audit fix --force`
Will install gulp@3.9.1, which is a breaking change
node_modules/glob-stream/node_modules/glob-parent
node_modules/glob-watcher/node_modules/glob-parent
  chokidar  1.0.0-rc1 - 2.1.8
  Depends on vulnerable versions of glob-parent
  node_modules/glob-watcher/node_modules/chokidar
    glob-watcher  3.0.0 - 5.0.5
    Depends on vulnerable versions of chokidar
    node_modules/glob-watcher
  glob-stream  5.3.0 - 6.1.0
  Depends on vulnerable versions of glob-parent
  node_modules/glob-stream
    vinyl-fs  2.4.2 - 3.0.3
    Depends on vulnerable versions of glob-stream
    node_modules/vinyl-fs
      gulp  >=4.0.0
      Depends on vulnerable versions of glob-watcher
      Depends on vulnerable versions of vinyl-fs
      node_modules/gulp

6 high severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force
```
