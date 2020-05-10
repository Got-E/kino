"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

gulp.task("css", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("clean", function () {
  return del("docs/*")
});

gulp.task("copy", function () {
  return gulp.src ([
    "source/css/*.css",
    "source/fonts/**",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("docs"));
});

gulp.task( "html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("docs"));
});

gulp.task("server", function() {
  server.init({
    server: "docs/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}",
  gulp.series("clean", "css", "html", "copy")).on("change", server.reload);
  gulp.watch("source/**/*.{html,svg}", gulp.series("clean", "html", "copy")).on("change", server.reload);
  });

gulp.task("start", gulp.series("clean", "css", "html", "copy", "server"));
