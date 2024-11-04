import {deleteAsync} from 'del';
import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import htmlmin from 'gulp-html-minifier-terser';
import rename from 'gulp-rename';
import zip from 'gulp-zip';
import ordered from 'ordered-read-streams';

// Custom modules & config
import { getFolders, mkDirByPathSync, fsExistsSync } from './lib/fsUtils.mjs'; // Use version ^2.0

// Directory structure
const dir = {
	dist:'./dist/html/',
	srcFla:'./src/banners/',
	zips:'./dist/zips/',
	onedriveFinal:'./oneDriveTest/html/',
	onedriveSrc: "./oneDriveTest/FLA/"
}

const c1 = 'Concept1',
  c2 = 'Concept2',
  c3 = 'Concept3',
  currentGroup = c1;

/* 
  If you're pulling existing files from OneDrive for editing, 
  This copies the FLAs into a src folder for development.
*/
function createSrcDir(concept){	
	const src = dir.onedriveSrc + concept;
	const files = fs.readdirSync(src);

	const streams = files.map((file) => {
			const _name = path.parse(file).name,
					_distPath = `${dir.srcFla}${concept}/${_name}`;

			if (!fs.existsSync(_distPath)){
					const _src = path.join(src, file),
							_dist = mkDirByPathSync(_distPath);
					
					console.log("* INIT", _name);

					return gulp.src(_src, {encoding: false})
							.pipe(gulp.dest(_dist));
			} else {
					console.log(`X 	NO Copy! Do not overwrite because ${_name} exists`);
					return Promise.resolve(); // Return a resolved promise instead of false
			}
	});
	return new ordered(streams.filter(Boolean)); // Filter out any non-stream values
}
/* 
  This minifies the Anmate export files and places into a dist folder for final delivery.
*/
function moveAssets(concept) {
	const src = path.join(dir.srcFla, concept);
	const groupFolders = getFolders(src);

	const streams = groupFolders.map((folder) => {
			const _src = path.join(src, folder);
			const _dist = path.join(dir.dist, concept, folder);

			const minOptions = { 
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true,
					removeComments: true,
					removeAttributeQuotes: true
			};

			console.log('MoveAss!', folder);

			const _html = gulp.src(`${_src}/*.html`)
					.pipe(htmlmin(minOptions))
					.pipe(rename(folder + '.html'))
					.pipe(gulp.dest(_dist));

			const _js = gulp.src(`${_src}/*.js`).pipe(gulp.dest(_dist));

			if (fsExistsSync(`${_src}/images/`)) {
					const _imgs = gulp.src(`${_src}/images/*`, { encoding: false })
							.pipe(gulp.dest(_dist + '/images'));
					return new ordered([_html, _js, _imgs]);
			}
			return new ordered([_html, _js]);
	});
	return new ordered(streams);
}
/* 
  This copies the source and exports into a OneDrive Folder for final delivery.
*/
function copyToOneDrive(concept){
	const src = dir.srcFla+concept;
	const groupFolders = getFolders(src);

	const streams = groupFolders.map((folder) => {
		const _src = path.join(src, folder);

		const fla =	gulp.src(`${_src}/*.fla`, {encoding: false})
			.pipe(gulp.dest(`${dir.onedriveSrc}${concept}`));

		const zips = gulp.src(`${dir.zips}/${concept}/${folder}.zip`, {encoding: false})
			.pipe(gulp.dest(`${dir.onedriveFinal}HTML/${concept}`));
		
		console.log('* Move to Onedrive:',folder);

		return new ordered([fla, zips]);
	});
	return new ordered(streams);
}

function zipFiles(concept) {
	const groupFolders = getFolders(path.join(dir.dist, concept));

	const streams = groupFolders.map((folder) => {
			const _dist = path.join(dir.dist, concept, folder);
			console.log('Zipping:', _dist);

			return gulp.src(_dist + '/**/*')
					.pipe(zip(folder + '.zip'))
					.pipe(gulp.dest(path.join(dir.zips, concept)));
	});

	return new Promise((resolve, reject) => {
			const combinedStream = new ordered(streams);

			combinedStream.on('end', resolve);
			combinedStream.on('error', reject);

			combinedStream.resume();
	});
}

gulp.task('init', () => createSrcDir(currentGroup));

gulp.task('clean', () => deleteAsync([`${dir.dist}/${currentGroup}/**`,`${dir.zips}/${currentGroup}/**`]));
gulp.task('clean:zips', () => deleteAsync([dir.zips+'**']));
gulp.task('clean:c1', () => deleteAsync([`${dir.zips}/${c1}/**`]));
gulp.task('clean:c2', () => deleteAsync([`${dir.zips}/${c2}/**`,]));
gulp.task('clean:c3', () => deleteAsync([`${dir.zips}/${c3}/**`,]));
gulp.task('clean:all', gulp.parallel('clean','clean:zips'));

// gulp.task('move', () => moveFiles(currentGroup));
gulp.task('move', () => moveAssets(currentGroup));

gulp.task('c1', () => moveAssets(c1));
gulp.task('c2', () => moveAssets(c2));
gulp.task('c3', () => moveAssets(c3));

gulp.task('od', () => copyToOneDrive(currentGroup));
gulp.task('od:c1', () => copyToOneDrive(c1));
gulp.task('od:c2', () => copyToOneDrive(c2));
gulp.task('od:c3', () => copyToOneDrive(c3));

gulp.task('zip', () => zipFiles(currentGroup));
gulp.task('zip:c1', () => zipFiles(c1));
gulp.task('zip:c2', () => zipFiles(c2));
gulp.task('zip:c3', () => zipFiles(c3));

// gulp.task('pack', gulp.series('clean', 'move', 'zip'));
gulp.task('pack', gulp.series('clean', 'move', 'zip', 'od'));
gulp.task('pack:c1', gulp.series('clean:c1', 'c1', 'zip:c1', 'od:c1'));
gulp.task('pack:c2', gulp.series('clean:c2', 'c2', 'zip:c2', 'od:c2'));
gulp.task('pack:c3', gulp.series('clean:c3', 'c3', 'zip:c3', 'od:c3'));

gulp.task('watch', () => gulp.watch([dir.srcFla+'**/**'], gulp.series('move')));

export default gulp.series('move');