var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var parallel = require("concurrent-transform");
var os = require("os");
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
const size = require('gulp-size');
const notify = require('gulp-notify');

gulp.task('default', function () {
  gulp.src('input/**/*.{jpg,png}')
    .pipe(parallel(
      imageResize({
        width : 1920,
        height : 1920,
        crop : false,
        upscale : false,
        samplingFactor: [2, 2],
        imageMagick: true,
        quality: 0.8,
      }),
      os.cpus().length
    ))
    .pipe(imagemin())
    .pipe(gulp.dest('output'));
});

gulp.task('resize', function () {
  gulp.src('input/**/*.{jpg,png}')
    .pipe(parallel(
      imageResize({
        width : 1920,
        height : 1920,
        crop : false,
        upscale : false
      }),
      os.cpus().length
    ))
    .pipe(gulp.dest('output'));
});

gulp.task('optimize', function () {
  gulp.src('input/**/*.{jpg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('output'));
});

gulp.task('clean', function () {
    return gulp.src('output/', {read: false})
        .pipe(clean());
});

gulp.task('size', () => {
    const s = size();

    return gulp.src(['./input/**/*', './output/**/*'])
      .pipe(s)
      .pipe(notify({
        onLast: true,
          message: () => `\nOriginal size: \t${s.prettySize}\nNew size: \t${s.prettySize}`
      }));
});
