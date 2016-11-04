var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
	less = require('gulp-less'),
    uglify  = require('gulp-uglify'),
    watch  = require('gulp-watch');

var DIST_DIR = 'dist';

gulp.task('build-back-end', function () {
    return gulp.src(['./src/back_end/**/**'])
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('compile-html', function () {
    return gulp.src(['./src/front_end/html/*'])
        .pipe(gulp.dest(DIST_DIR + '/public'));
});

gulp.task('compile-less', function () {
    return gulp.src([
        './src/front_end/styles/**/**'
    ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/public/styles/'));
});

gulp.task('compile-js', function () {
    return gulp.src(['./src/front_end/scripts/**/**'])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_DIR + '/public/scripts'));
});

gulp.task('libs', function(){
    return gulp.src([
            './bower_components/jquery/dist/jquery.min.js',
            './src/public/libs/**/*.*'
        ])
        .pipe(gulp.dest('./dist/front-end/libs'));
});

gulp.task('build-front-end', [
    'compile-html',
    'compile-js',
	'compile-less',
    'libs'
]);

gulp.task('build', [
    'build-back-end',
    'build-front-end'
]);

gulp.task('default', [ 'build' ]);

gulp.task('watch', function () {
    return gulp.watch('./src/**/**', ['build']);
});