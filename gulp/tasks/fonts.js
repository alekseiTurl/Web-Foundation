import gulp from 'gulp'
import config from '../config'
import ttf2woff from 'gulp-ttf2woff'
import ttf2woff2 from 'gulp-ttf2woff2'
import del from 'del'
import util from 'gulp-util'

gulp.task('fonts', () =>
    gulp
        .src(config.src.fonts + '/*.ttf')
        .pipe(ttf2woff())
        .pipe(gulp.dest(config.src.fonts))
        .pipe(gulp.src(config.src.fonts + '/*.ttf'))
        .pipe(ttf2woff2())
        .on('end', () => {
            del([ config.src.fonts + '/*.ttf' ]).then(paths =>
                util.log('Deleted:', util.colors.magenta(paths.join('\n')))
            )
        })
)

const build = gulp => gulp.series('fonts')

module.exports.build = build
