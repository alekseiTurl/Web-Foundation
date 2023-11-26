import gulp from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import mqpacker from '@lipemat/css-mqpacker'
import config from '../config'
import csso from 'postcss-csso'
import gulpif from 'gulp-if'
import purgeCSSPlugin from '@fullhuman/postcss-purgecss'

const sass = gulpSass(dartSass)

const isMax = mq => /max-width/.test(mq)
const isMin = mq => /min-width/.test(mq)

const sortMediaQueries = (a, b) => {
    const A = a.replace(/\D/g, '') || 0
    const B = b.replace(/\D/g, '') || 0

    if (isMax(a) && isMax(b)) {
        return B - A
    } else if (isMin(a) && isMin(b)) {
        return A - B
    } else if (isMax(a) && isMin(b)) {
        return 1
    } else if (isMin(a) && isMax(b)) {
        return -1
    }
    return B - A
}

const processorsDev = [
    autoprefixer({
        cascade: false,
    }),
    mqpacker({
        sort: sortMediaQueries,
    }),
    csso,
]

const processorsBuild = [
    autoprefixer({
        cascade: false,
    }),
    mqpacker({
        sort: sortMediaQueries,
    }),
    purgeCSSPlugin({
        content: ['./**/*.twig', './**/*.html'],
    }),
    csso,
]

const processors = !config.production ? processorsDev : processorsBuild

gulp.task('sass', () =>
    gulp
        .src(config.src.sass + '/*.{sass,scss}')
        .pipe(gulpif(!config.production, sourcemaps.init()))
        .pipe(
            sass.sync({
                includePaths: ['node_modules'],
                outputStyle: config.production ? 'compressed' : 'expanded', // nested, expanded, compact, compressed
                precision: 5,
            }),
        )
        .on('error', config.errorHandler)
        .pipe(postcss(processors))
        .pipe(gulpif(!config.production, sourcemaps.write('./')))
        .pipe(gulp.dest(config.dest.css)),
)

const build = gulp => gulp.parallel('sass')
const watch = gulp => () => gulp.watch(config.src.sass + '/**/*.{sass,scss}', { usePolling: true }, gulp.parallel('sass'))

module.exports.build = build
module.exports.watch = watch
