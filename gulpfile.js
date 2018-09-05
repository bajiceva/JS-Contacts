// task za minifikovajne css-a
// task za web server
// task za optimizaciju slika
// task za minifikovanje js-a
// istraziti sta je browserify/requirejs/webpack
// local storage
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var browserify = require('browserify');
var through2 = require('through2');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');

gulp.task('browserify', function() {
	var browserified = function (file, enc, next) {
		browserify({
		    entries: file.path,
		    debug: true
		}).bundle(function (err, res) {
		    file.contents = (typeof res !== 'undefined') ? res : null;
		    next(err, file);
		});
    };

    return gulp.src('assets/js/index.js')
        .pipe(plumber({errorHandler: notify.onError('Browserify error: <%= error.message %>')}))
        .pipe(through2.obj(browserified))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('uglify', ['browserify'], function () {
	gulp.src('build/js/index.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('styles', function () {
	gulp.src('assets/css/*.css')
	.pipe(cleanCSS())
  	.pipe(gulp.dest('build/css'));
});

gulp.task('images', function () {
	gulp.src('assets/images/**/*')
  	.pipe(imagemin())
  	.pipe(gulp.dest('build/img'));
});

gulp.task('server', function() {
	gulp.src('./')
		.pipe(webserver({
			livereload: true,
			directoryListing: false,
			open: true
	}));
});

gulp.task('watch', ['server'], function () {
	gulp.watch('assets/js/**/*.js', ['browserify']);
	gulp.watch('assets/css/*.css', ['styles']);
});

gulp.task('default', ['browserify', 'styles', 'watch']);
gulp.task('build', ['uglify', 'styles']);