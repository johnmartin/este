import gulp from 'gulp'
import runSequence from 'run-sequence'

import args from './support/args'

gulp.task('server', ['env'], done => {
  if (args.production) {
    runSequence('clean', 'build', 'server-node', done)
  } else {
    runSequence('server-hot', 'server-nodemon', done)
  }
})
