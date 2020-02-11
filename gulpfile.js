// Node & NPM packages
const merge = require('merge-stream'),
			path = require('path'),
			gulp = require('gulp'),
			rename = require('gulp-rename'),
			zip = require('gulp-zip');

// Custom modules & config
const util = require('./lib/fsUtils');

const paths = {
	src:'./src/banners',
	dist:'./dist'
}

const srcFolders = util.getFolders(paths.src);

// Gulp Tasks

gulp.task('default', zipFiles);

function zipFiles() {
	let task = srcFolders.map(function(folder) {
		let _src = path.join(paths.src, folder),// Path source files
				_files = _src+'/*.{html,js,json}', // Package html into the _final zip
				_images = _src+'/images/**';// Path to production image files

		let _final =  gulp.src([_files,_images],{base:_src})
			.pipe(zip('_final.zip'))
			.pipe(rename(function(file){file.basename = folder + file.basename;}))
			.pipe(gulp.dest(paths.dist));

		let _source =  gulp.src([path.join(paths.src, folder,'*.fla'),'./src/global/**'])
			.pipe(zip('_source.zip'))
			.pipe(rename(function(file){file.basename = folder + file.basename;}))
			.pipe(gulp.dest(paths.dist));

		let _html = gulp.src(_src+'/*.html').pipe(gulp.dest(paths.dist));// Copy the HTML into the dist folder

		return merge(_html, _final, _source)
	});
	let lastStream = task[task.length-1];
	return lastStream;
};