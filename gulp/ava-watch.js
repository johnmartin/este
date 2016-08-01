import gulp from 'gulp'
import childProcess from 'child_process'

gulp.task('ava-watch', done => {
  childProcess
    .spawn('npm', ['run', 'ava:watch'], { stdio: 'inherit' })
    .on('close', done)
})
