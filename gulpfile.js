var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('browserSync' , function(){
    browserSync.init({
        server:{
            baseDir:'dist'
        }
    });
});

gulp.task('sass' , function(){
    return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
        stream:true
    }));
});
gulp.task('handleJs' , function(){
    return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({
        stream:true
    }));
});
gulp.task('handleHtml' , function(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
        stream:true
    }));
})

gulp.task('watch' , ['browserSync','sass'] , function(){
    gulp.watch('src/scss/*.scss',['sass']);
    gulp.watch('src/js/*.js',['handleJs']);
    gulp.watch('src/*.html',['handleHtml']);
});
gulp.task('default' , ['watch']);
