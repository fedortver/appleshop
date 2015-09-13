var gulp = require("gulp"),
	browserSync = require("browser-sync"),
	sass = require("gulp-sass"),
	jade = require("gulp-jade");


gulp.task('server', function(){
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('sass', function(){
	gulp.src('./app/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function(){
	gulp.watch('./app/sass/*.scss',['sass']);
});

gulp.task('jade', function() { 
  gulp.src('./app/jade/index.jade')
    .pipe(jade({
    	pretty: true
    }).on('error', function(err){console.log(err.message)}))
    .pipe(gulp.dest('./app'))
});

gulp.task('jade:watch', function(){
	gulp.watch('./app/jade/**/*.jade',['jade']);
});

gulp.task('watch', function(){
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'jade:watch', 'sass:watch', 'watch']);
