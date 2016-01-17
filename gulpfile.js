var babelify = require('babelify');
var browserify = require('browserify');
var connect = require('gulp-connect');
var cssmin = require('gulp-cssmin');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var files = {
  // Add here any library dependencies your jsx files have
  dependencies: [
    'react',
    'react-dom'
  ],

  browserify: [
    './src/main.jsx'
  ],

  // Add your css files here
  css: [
  ]
};

// ----- You probably will not need to change anything under this line -----

var browserifyTask = function (options) {

  var bundler = browserify({
    entries: [options.src],
    transform: [
      ['babelify', {presets: ['es2015', 'react']}]
    ],
    debug: options.development,
    cache: {}, // Requirement of watchify
    packageCache: {}, // Requirement of watchify
    fullPaths: options.development
  });

  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    bundler
      .bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, connect.reload()))
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  if (options.development) {
    bundler.external(files.dependencies);
    bundler = watchify(bundler);
    bundler.on('update', rebundle);

    var vendorsBundler = browserify({
     debug: true,
     require: files.dependencies
    });

    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));
  }

  rebundle();

};

var cssTask = function (options) {

  var start = new Date();
  console.log('Building CSS bundle');
  gulp.src(options.src)
    .pipe(concat('styles.css'))
    .pipe(gulpif(!options.development, cssmin()))
    .pipe(gulp.dest(options.dest))
    .pipe(gulpif(options.development, connect.reload()))
    .pipe(notify(function () {
      console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
    }));

};

gulp.task('deploy', function () {

  browserifyTask({
    development: false,
    src: files.browserify,
    dest: './dist/scripts'
  });

  cssTask({
    development: false,
    src: files.css,
    dest: './dist/styles'
  });

});

gulp.task('default', function() {

  var browserifyOpt = {
    development: true,
    src: files.browserify,
    dest: './build/scripts'
  };

  var cssOpt = {
    development: true,
    src: files.css,
    dest: './build/styles'
  };

  var serverOpt = {
    root: './build',
    port: 8889,
    livereload: true
  };

  browserifyTask(browserifyOpt);
  cssTask(cssOpt);
  connect.server(serverOpt);

  var watcher = gulp.watch(files.css, function () {
    cssTask(cssOpt);
  });

});