// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var cssNano = require('gulp-cssnano');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');


gulp.task('lint-app', function() {
	return gulp.src('./app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});


gulp.task('lint-test', function() {
	return gulp.src('./test/**/*.js')
		.pipe(jshint())
		.piep(jshint.reporter('default'));
});


gulp.task('browserify-app', ['lint-app'], function() {
  return gulp.src('app/index.js')
    .pipe(browserify({
		insertGlobals: true
    }))
    .pipe(rename('simplemindmaps.js'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/javascripts'));
});


gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('test/client/index.js')
    .pipe(browserify({
		insertGlobals: true
    }))
    .pipe(rename('app-test.js'))
    .pipe(gulp.dest('build'));
});


gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['browserify-app']);
  gulp.watch('test/app/**/*.js', ['browserify-test']);
});