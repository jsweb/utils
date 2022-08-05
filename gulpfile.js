import { exec } from 'child_process'
import gulp from 'gulp'
import esbuild from 'gulp-esbuild'

export function clean() {
  return exec('rm -rf lib components modules web')
}

export function devBuild() {
  return gulp
    .src('src/**/*.ts')
    .pipe(esbuild({ format: 'esm', bundle: true, treeShaking: true }))
    .pipe(gulp.dest('lib'))
}

export function devTypes() {
  return exec('npx tsc --emitDeclarationOnly')
}

export function publishBuild() {
  return gulp
    .src('src/**/*.ts')
    .pipe(
      esbuild({
        format: 'esm',
        bundle: true,
        minify: true,
        treeShaking: true,
        tsconfig: 'tsconfig.build.json',
      })
    )
    .pipe(gulp.dest('.'))
}

export function publishTypes() {
  return exec('npx tsc -p tsconfig.build.json --emitDeclarationOnly')
}

gulp.task('build:dev', (cb) => {
  gulp.series(clean, devBuild, devTypes)(cb)
})

gulp.task('build:publish', (cb) => {
  gulp.series(clean, publishBuild, publishTypes)(cb)
})
