import gulp from 'gulp'
import requireDir from 'require-dir'
import 'regenerator-runtime/runtime'

requireDir('./gulp', { recurse: false })
gulp.task('default', ['server'])
