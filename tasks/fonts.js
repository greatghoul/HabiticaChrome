import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './lib/args';

gulp.task('fonts', () => {
  const fontPaths = [
    'app/fonts/**/*.{woff,woff2,ttf,eot,svg}',
    'node_modules/font-awesome/fonts/*.{woff,woff2,ttf,eot,svg}'
  ];

  return gulp.src(fontPaths)
    .pipe(gulp.dest(`dist/${args.vendor}/fonts`))
    .pipe(gulpif(args.watch, livereload()));
});
