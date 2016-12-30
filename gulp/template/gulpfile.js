var gulp 		 = require('gulp'),
    jade         = require('gulp-jade'),
	clean 		 = require('gulp-clean'),      
	uglify 		 = require('gulp-uglify'), 
    header       = require('gulp-header'),   
	rename 		 = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    util         = require('gulp-util'),     
	sass 		 = require('gulp-ruby-sass'),        
	minifycss 	 = require('gulp-minify-css'),   
	concat 		 = require('gulp-concat'),
    connect      = require('gulp-connect'); 
    // gulp-inject和wiredep     

var Version      =   '1.0.0';
var buildDate    =   util.date(  Date.now(), 'isoDate') + " " + util.date(Date.now() , 'isoTime');
var banner       =   ['/*\n * Version: ', Version, '\n * Author: xioYown \n * Updated: ', buildDate, '\n*/\n'].join('');

var debug = true;

var path = {
    jade: './views',
    js: './src/static/js',
    sass: './src/static/sass',
    css: './src/static/css',
    img: './src/static/img',
    dist: './dist'
};

var config = {
    min: debug ? '' : '.min',
    description: '流程可视化',
    keywords: '数据 流程 生产'
};
gulp.task('jade', function(){
    gulp.src(path.jade + '/*.jade')
    .pipe(jade({
        locals: {
            config: config,
            stamp: '?v=' + new Date().valueOf()
        },
        pretty: false
    }))
    .pipe(gulp.dest( debug ? './src' : path.dist))
    .pipe(connect.reload())
});

gulp.task('sass', function(){
    sass([path.sass + '/*.scss'])
    .pipe( autoprefixer({
        browsers: ['last 40 versions', 'safari 5', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(gulp.dest(path.css))
    .pipe(connect.reload())
});

gulp.task('base', function(){
    gulp.src([path.js + '/base/*.js'])
    .pipe( concat('base.js') )
    .pipe(gulp.dest(path.js))
});

gulp.task('css', function(){
    gulp.src(path.css + '/*.css')
    .pipe(minifycss())
    .pipe(header(banner))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.dist + '/static/css'))
});

gulp.task('js', function(){
    gulp.src(path.js + '/*.js')
    .pipe(uglify())
    .pipe(header(banner))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.dist + '/static/js'))
    .pipe(connect.reload())
});

gulp.task('img', function(){
    gulp.src(path.img + '/*.*')
    .pipe(gulp.dest(path.dist + '/static/img'))
});
/* 热启配置 */
gulp.task('connect', function () {
     connect.server({
        host: '192.168.0.108',
        port: 8010,
        livereload: true
     });
 });

gulp.task('default', function(){
    gulp.watch([path.jade + '/*.jade'], ['jade']);
    gulp.watch([path.js + '/base/*.js'], ['base']);
    gulp.watch([path.sass   + '/*.scss'], ['sass']);
});
// 热启动
gulp.task('hot', ['connect','default']);
// 打包任务
gulp.task('all', ['jade', 'sass', 'css', 'base'/*, 'js'*/, 'img']);
