import gulp from 'gulp';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import webp from 'imagemin-webp';
import config from '../config';

gulp.task('webp', () =>
    gulp.src(`${config.src.img}/*.{jpeg,jpg,png,JPEG,JPG,PNG}`)
        .pipe(imagemin([ webp({
            quality: 80,
            preset: 'photo',
            method: 6
        }) ]))
        .pipe(rename({ extname: '.webp' }))
        .pipe(gulp.dest(config.dest.img))
);

const build = gulp => gulp.parallel('webp');
const watch = gulp => () => gulp.watch(`${config.src.img}/*.{jpeg,jpg,png,JPEG,JPG,PNG}`, gulp.parallel('webp'));

module.exports.build = build;
module.exports.watch = watch;
