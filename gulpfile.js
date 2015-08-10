// gulpfile.js
// compiles jade, concats and minifies, compiles sass

// Include gulp
var gulp = require('gulp');

// Include plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var jade = require('gulp-jade');

// Lint
gulp.task('lint', function() {
	return gulp.src('./js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Sass
gulp.task('sass', function() {
	return gulp.src('./scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./build/css'));
});

// Concat and Minify
gulp.task('scripts', function() {
	return gulp.src('./js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./build/js'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'));
});

// Jade
gulp.task('jade', function() {
	return gulp.src('./views/*.jade')
		.pipe(jade())
	.pipe(gulp.dest('./build/views'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('./js/*.js', ['lint', 'scripts']);
	gulp.watch('./scss/*.scss', ['sass']);
	gulp.watch('./views/*.jade', ['jdae']);
});

// Default Task
gulp.task('default', ['lint', 'saas', 'scripts', 'jade', 'watch']);
