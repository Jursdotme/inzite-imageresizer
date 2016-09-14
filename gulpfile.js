var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var parallel = require("concurrent-transform");
var os = require("os");

gulp.task('default', function () {
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
