import gulp from 'gulp'
import eslint from 'gulp-eslint'
import gulpIf from 'gulp-if'

import args from './args'

// To fix some eslint issues: gulp eslint --fix
const runEslint = () => {
  const isFixed = file => args.fix && file.eslint && file.eslint.fixed
  return gulp.src([
    'gulp/**/*.js',
    'gulpfile.babel.js',
    'messages/*.js',
    'src/**/*.js',
    'webpack/*.js'
  ], { base: './' })
    .pipe(eslint({ fix: args.fix }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')))
}

export default runEslint
