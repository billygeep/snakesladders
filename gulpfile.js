
var gulp = require('gulp');

var browserSync = require('browser-sync').create();

var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat')
var gutil = require('gulp-util');
var del = require('del');
var runSequence = require('run-sequence');
var gulpRemoveHtml = require('gulp-remove-html');


gulp.task('useref', function(){
  return gulp.src('game/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpRemoveHtml())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('dist'))
});


gulp.task('images', function(){
  return gulp.src(['game/assets/images/*.+(png|json)'])
  // Caching images that ran through imagemin
  .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('data', function(){
  return gulp.src(['game/data/*.+(json)'])
  // Caching images that ran through imagemin
  .pipe(gulp.dest('dist/data'))
});

gulp.task('scenes', function(){
  return gulp.src(['game/assets/images/scenes/**/*.+(png|jpg|gif|svg)'])
  // Caching images that ran through imagemin
  .pipe(gulp.dest('dist/assets/images/scenes'))
});

gulp.task('shareimages', function(){
  return gulp.src(['game/assets/images/shareables/**/*.+(png|jpg|gif|svg)'])
  // Caching images that ran through imagemin
  .pipe(gulp.dest('dist/assets/images/shareables'))
});

gulp.task('fonts', function() {
  return gulp.src('game/assets/fonts/**/*')
  .pipe(gulp.dest('dist/assets/fonts'))
})

gulp.task('audio', function() {
  return gulp.src('game/assets/audio/**/*')
  .pipe(gulp.dest('dist/assets/audio'))
})

gulp.task('js', function(){
  return gulp.src('game/js/phaser_loaded/**/*.js')
  // Caching images that ran through imagemin
  .pipe(gulp.dest('dist/js/phaser_loaded'))
});

gulp.task('css', function(){
  return gulp.src('game/css/**/*.css')
  // Caching images that ran through imagemin
  .pipe(gulp.dest('dist/css'))
});

gulp.task('shareables', function(){
  return gulp.src('game/shareables/**/*.html')
  // Caching images that ran through imagemin
  .pipe(gulp.dest('dist/shareables'))
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'game'
    },
  })
})

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['useref', 'fonts', 'audio', 'images', 'scenes', 'shareimages', 'data', 'js', 'css', 'shareables'],
    callback
  )
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
})


gulp.task('watch', ['browserSync'], function (){
	gulp.watch('game/*.html', browserSync.reload); 
 	gulp.watch('game/js/**/*.js', browserSync.reload); 
  // gulp.watch('game/scss/**/*.scss', ['sass']); 
  // Other watchers
})