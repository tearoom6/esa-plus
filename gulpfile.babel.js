// generated on 2017-02-13 using generator-chrome-extension 0.6.1
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import del from 'del'
import {stream as wiredep} from 'wiredep'

const $ = gulpLoadPlugins()

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'app/_locales/**',
    '!app/scripts.babel',
    '!app/*.json',
    '!app/*.html',
    '!app/styles.scss'
  ], {
    base: 'app',
    dot: true
  }).pipe(gulp.dest('dist'))
})

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format())
  }
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
  env: {
    es6: true
  }
}))

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err)
      this.end()
    })))
    .pipe(gulp.dest('dist/images'))
})

gulp.task('styles', () => {
  return gulp.src('app/styles.scss/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe(gulp.dest('app/styles'))
})

gulp.task('html', gulp.series(
  'styles',
  () => {
    return gulp.src('app/*.html')
      .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
      .pipe($.sourcemaps.init())
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
      .pipe($.sourcemaps.write())
      .pipe($.if('*.html', $.htmlmin({removeComments: true, collapseWhitespace: true})))
      .pipe(gulp.dest('dist'))
  },
))

gulp.task('babel', () => {
  return gulp.src('app/scripts.babel/**/*.js')
    .pipe($.babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('app/scripts'))
})

gulp.task('chromeManifest', gulp.series(
  'babel',
  () => {
    return gulp.src('app/manifest.json')
      .pipe($.chromeManifest({
          buildnumber: true,
          background: {
            target: 'scripts/background.js',
            exclude: [
              'scripts/chromereload.js'
            ]
          }
      }))
      .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
      .pipe($.if('*.js', $.sourcemaps.init()))
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.js', $.sourcemaps.write('.')))
      .pipe(gulp.dest('../dist'))
  },
))

gulp.task('clean', (callback) => {
  return del(['.tmp', 'dist', 'app/scripts', 'app/styles'], callback)
})

gulp.task('watch', gulp.series(
  'lint',
  'babel',
  () => {
    $.livereload.listen()

    gulp.watch([
      'app/*.html',
      'app/scripts/**/*.js',
      'app/images/**/*',
      'app/styles/**/*',
      'app/_locales/**/*.json'
    ]).on('change', $.livereload.reload)

    gulp.watch('app/scripts.babel/**/*.js', gulp.series('lint', 'babel'))
    gulp.watch('app/styles.scss/**/*.scss', gulp.task('styles'))
    gulp.watch('bower.json', gulp.task('wiredep'))
  },
))

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}))
})

gulp.task('wiredep', () => {
  return gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'))
})

gulp.task('package', () => {
  var manifest = require('./dist/manifest.json')
  return gulp.src('dist/**')
    .pipe($.zip('esa-plus-' + manifest.version + '.zip'))
    .pipe(gulp.dest('package'))
})

gulp.task('build', gulp.series(
  'lint',
  'babel',
  'chromeManifest',
  gulp.parallel('html', 'images', 'extras'),
  'size',
  (callback) => { callback() },
))

gulp.task('default', gulp.series(
  'clean',
  'build',
  (callback) => { callback() },
))
