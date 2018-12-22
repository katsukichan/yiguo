//任务compileSass:sass->css:
var gulp = require("gulp"); 
var sass = require("gulp-sass"); 

gulp.task("compileSass",function(){
	return gulp.src("./src/sass/**/*.scss")
	.pipe(sass({outputStyle:'expanded'}).on('error', sass.logError)) 
	.pipe(gulp.dest("./src/css/"))
})
// 任务2：监听.scss
gulp.task("jt",function(){
gulp.watch("./src/sass/**/*.scss",gulp.series("compileSass"))
})