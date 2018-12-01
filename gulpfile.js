var path = require("path");
var gulp = require("gulp");
var gutil = require('gulp-util');
let clean = require("gulp-clean");
var less = require("gulp-less");
var babel = require("gulp-babel");
var ts = require("gulp-typescript");
var gulpSequence = require("gulp-sequence");
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var LessAutoprefix = require("less-plugin-autoprefix");
var autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });

gulp.task("less", function() {
  return gulp
    .src("./src/**/*.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
        plugins: [autoprefix]
      })
    )
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist"));
});
gulp.task("clean", function() {
  return gulp
    .src(["lib/**/*.*", "dist/**/*.*"], {
      read: false
    })
    .pipe(clean());
});
gulp.task("tsc", cb => {
  var tsProject = ts.createProject("tsconfig.json");
  var tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest("lib"));
});
gulp.task("dtsc", cb => {
  var tsProject = ts.createProject("tsconfig.json");
  var tsResult = tsProject.src().pipe(tsProject());
  return tsResult.dts.pipe(gulp.dest("lib"));
});
gulp.task("babel", cb => {
  return gulp
    .src("dist/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel().on('error', function(err) {
      gutil.error('Error!', err.message);
      this.emit('end');
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("lib/"));
});

gulp.task(
  "default",
  gulpSequence("clean", "tsc", "dtsc")
);
