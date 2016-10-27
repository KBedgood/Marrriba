'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const config = {
  styles: {
    src: [
      './app/styles/*.scss'
    ],
    sass: {
      includePaths: [
        require('node-bourbon').includePaths,
        './node_modules/tether/dist/css',
        './node_modules/bootstrap/scss',
        './node_modules/font-awesome/scss'
      ]
    },
    watch: [
      './app/styles/*.scss',
      './app/styles/lib/*.scss',
      './app/styles/partials/*.scss'
    ]
  },
  fonts: {
    src: [
      './node_modules/font-awesome/fonts/*'
    ]
  },
  scripts: {
    src: [
      './app/scripts/homepage.js',
      './app/scripts/boats.js'
    ],
    babel: {
      presets: [ 'es2015' ]
    },
    watch: [
      './app/scripts/homepage.js',
      './app/scripts/boats.js'
    ]
  },
  markup: {
    watch: [
      './dist/*.html'
    ]
  }
};

function compileStyles() {
  return gulp
    .src(config.styles.src)
    .pipe(sass(config.styles.sass).on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(browserSync.stream());
}

function copyFonts() {
  return gulp
    .src(config.fonts.src)
    .pipe(gulp.dest('./dist/fonts'));
}

function transpileJavaScript() {
  return gulp
    .src(config.scripts.src)
    .pipe(plumber())
    .pipe(babel(config.scripts.babel))
    .on('error', err => {
      util.log(util.colors.red('[JavaScript Transpilation Error]'));
      util.log(util.colors.red(err.message));
    })
    .pipe(gulp.dest('./dist/scripts'));
}

function startServer() {
  return browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

function reload() {
  return browserSync.reload();
}

function watchFiles() {
  gulp.watch(config.styles.watch, [ 'styles' ]);
  gulp.watch(config.scripts.watch, [ 'scripts' ]);
  gulp.watch(config.markup.watch, [ 'reload' ]);
}

gulp.task('styles', compileStyles);
gulp.task('fonts', copyFonts);
gulp.task('transpile', transpileJavaScript);
gulp.task('scripts', [ 'transpile' ], reload);
gulp.task('build', [ 'styles', 'fonts', 'scripts' ]);
gulp.task('serve', [ 'build' ], startServer);
gulp.task('reload', reload);
gulp.task('watch', watchFiles);
gulp.task('default', [ 'serve', 'watch' ]);
