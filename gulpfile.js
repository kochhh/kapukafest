const gulp = require('gulp')
const del = require('del')
const nunjucks = require('gulp-nunjucks')
const postcss = require('gulp-postcss')
const uglify = require('gulp-uglify')
const browsersync = require('browser-sync')

const paths = {
  html: {
    src: './src/*.njk',
    dist: './dist'
  },
  styles: {
    src: './src/css/*.css',
    dist: './dist/css'
  },
  scripts: {
    src: './src/js/*.js',
    dist: './dist/js'
  },
  images: {
    src: './src/images',
    dist: './dist/images'
  },
  favicons: {
    src: './src/favicons',
    dist: './dist'
  },
}

gulp.task('html', () => {
  return gulp.src(paths.html.src)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(paths.html.dist))
    .pipe(browsersync.stream())
})

gulp.task('styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer')({
        cascade: false
      }),
      require('postcss-csso')
    ]))
    .pipe(gulp.dest(paths.styles.dist))
    .on('end', browsersync.reload)
})

gulp.task('scripts', () => {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dist))
    .on('end', browsersync.reload)
})

gulp.task('images', () => {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dist))
    .on('end', browsersync.reload)
})

gulp.task('favicons', () => {
  return gulp.src(paths.favicons.src)
    .pipe(gulp.dest(paths.favicons.dist))
    .on('end', browsersync.reload)
})

gulp.task('clean', () => {
  return del(['./dist/*'])
})

gulp.task('serve', () => {
  browsersync.init({
    server: './dist/',
    port: 4000,
    notify: false,
    open: false
  })

  gulp.watch(paths.html.src, gulp.series('html'))
  gulp.watch(paths.styles.src, gulp.series('styles'))
  gulp.watch(paths.scripts.src, gulp.series('scripts'))
  gulp.watch(paths.images.src, gulp.series('images'))
  gulp.watch(paths.favicons.src, gulp.series('favicons'))
})

gulp.task('dev', gulp.series(
  'clean',
  gulp.series([
    'html',
    'styles',
    'scripts',
    'images',
    'favicons'
  ]),
  gulp.parallel('serve')
))

gulp.task('build', gulp.series(
  'clean',
  gulp.series([
    'html',
    'styles',
    'scripts',
    'images',
    'favicons'
  ])
))
