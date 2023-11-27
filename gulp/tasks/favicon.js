import gulp from 'gulp'
import config from '../config'
const build = gulp => gulp.series('favicon')
module.exports.build = build

gulp.task('favicon', () =>
    gulp
        .src(config.src.favicon + '/*')
        .pipe(gulp.dest(config.dest.favicon))
)
gulp.task('favicon-main', () =>
    gulp
        .src(config.src.favicon + '/*.ico')
        .pipe(gulp.dest(config.dest.root))
)
