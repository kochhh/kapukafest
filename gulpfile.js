const gulp = require('gulp')
const del = require('del')
const yargs = require('yargs')
const gulpif = require('gulp-if')
const nunjucks = require('gulp-nunjucks')
const htmlmin = require('gulp-htmlmin')
const postcss = require('gulp-postcss')
const uglify = require('gulp-uglify')
const browsersync = require('browser-sync')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const rollup = require('@rollup/stream')
const babel = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')

const argv = yargs.argv
const production = !!argv.production
let cache

const paths = {
  html: {
    src: './src/*.njk',
    dist: './dist',
    watch: './src/**/*.njk'
  },
  styles: {
    src: './src/css/*.css',
    dist: './dist/css'
  },
  scripts: {
    src: './src/js/app.js',
    dist: './dist/js'
  },
  images: {
    src: './src/images/*.*',
    dist: './dist/images'
  },
  favicons: {
    src: './src/favicons/*.*',
    dist: './dist'
  },
}

gulp.task('html', () => {
  return gulp.src(paths.html.src)
    .pipe(nunjucks.compile())
    .pipe(gulpif(production, htmlmin({
      collapseWhitespace: true
    })))
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
    ]))
    .pipe(gulpif(production, postcss([
      require('postcss-csso')
    ])))
    .pipe(gulp.dest(paths.styles.dist))
    .on('end', browsersync.reload)
})

gulp.task('scripts', () => {
  return rollup({
      input: paths.scripts.src,
      plugins: [
        nodeResolve.nodeResolve(),
        commonjs({
          include: 'node_modules/**'
        }),
        babel.babel({
          presets: ['@babel/preset-env'],
          babelHelpers: 'bundled',
        }),
      ],
      cache: cache,
      output: {
        format: 'iife',
      },
    })
    .on('bundle', function(bundle) {
      cache = bundle
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpif(production, uglify()))
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

  gulp.watch(paths.html.watch, gulp.series('html'))
  gulp.watch([paths.styles.src, paths.html.watch, './tailwind.config.js'], gulp.series('styles'))
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
