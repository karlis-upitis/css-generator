// setting general settings
var css_src     = './scss/style.scss';
var css_dest    = '../assets/style/';

// when passing multiple .scss source folders
// var css_src     = {[
// 	'bower_components/jquery/jquery.js',
// 	'bower_components/superscrollorama/js/greensock/TweenMax.min.js',
// 	'bower_components/superscrollorama/jquery.superscrollorama.js'
// 	],
// 	{base: 'bower_components/'}
// }



// gulp general modules
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	plumber = require('gulp-plumber'),

	//css related modules
	sass    = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	neat = require('node-neat').includePaths,
	autoprefixer = require('autoprefixer'),
	
	//additional tools
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

// helper function/-s

/**
 * If error occurs return error msg and doesn't stop
 * execution of gulp
 */
var onError = function (err) {  
	gutil.beep();
	console.log(err);
	this.emit('end');
};


/*-------------------------------------
	Compile and process CSS
-------------------------------------*/
gulp.task('css', function () {
	// processors for postcss
	var processors = [
		autoprefixer({browsers: ['last 3 versions']})
		//add here new processors if needed
	];

	return gulp.src(css_src)
		.pipe(plumber({
			errorHandler: onError,
		}))
		.pipe(sass({
            includePaths: ['css'].concat(neat),
            sourceComments: true
        	}).on('error', sass.logError)
		)
		.pipe(postcss(processors))
		.pipe(gulp.dest(css_dest))
		.pipe(reload({stream:true}));
});





/*-------------------------------------
	Browser sync (alt. for livereload)
-------------------------------------*/
gulp.task('browser-sync', function() {
	browserSync({
		proxy: 'neteye.dev',
		port: 9999,
		open: false,
		notify: false
	});
});

/*-------------------------------------
	watch
-------------------------------------*/
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['css']);
	gulp.watch('../*.html').on('change', browserSync.reload);
});

/*-------------------------------------
	default tasks
-------------------------------------*/
gulp.task('default', ['css', 'browser-sync', 'watch']);
