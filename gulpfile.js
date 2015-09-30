"use strict";
//Include gulp
var gulp = require('gulp');

//Iclude gulp plugins
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var del = require('del');

//Lint Taks
gulp.task("lint", function() {
	return gulp.src('public/javascripts/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

//Concat Js task
gulp.task("concatScripts", function() {
return gulp.src([
		'app.js',
		'public/javascripts/main.js'
	])
	.pipe(maps.init())
	.pipe(concat('base.js'))
	.pipe(gulp.dest('public/javascripts'));
});

//Minify Scripts task
gulp.task("minifyScripts", ["concatScripts"], function() {
	return gulp.src("public/javascripts/base.js")
		.pipe(uglify())
		.pipe(rename('base.min.js'))
		.pipe(gulp.dest('public/javascripts'));
});

//Compile Sass task
gulp.task("compileSass", function() {
	return gulp.src("public/scss/application.scss")
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest("public/stylesheets"));
});

//Compile Jade task
gulp.task("compileJade", function() {
	return gulp.src("views/*.jade")
		.pipe(jade())
		.pipe(gulp.dest("public/views"));
});


//Clean/Delete task
gulp.task("clean", function() {
	del([
		'dist',
		'public/stylesheets/application.css*',
		'public/javascripts/base*.js*',
		'public/views/**'
	])
});

//Watch task
gulp.task('watchFiles', function(){
	gulp.watch('public/scss/**/*.scss', ['compileSass']);
	gulp.watch('public/views/**', ['compileJade']);
});

//Build Tasks

gulp.task("build", ['minifyScripts', 'compileSass', 'compileJade'], function () {
	return gulp.src(["public/stylesheets/application.css", "public/javascripts/base.min.js", "public/views/**", "public/images/**"], {base: './'})
	.pipe(gulp.dest('dist'));
});

//dev build
	//do later?

//prod build
gulp.task("default", ["clean"], function() {
	gulp.start('build'); //This is changed to gulp.series in gulp 4
});
