import gulp from 'gulp'
import childProcess from 'child_process'

gulp.task('ava', done => {
  childProcess
    .spawn('npm', ['run', 'ava'], { stdio: 'inherit' })
    .on('close', done)
})
