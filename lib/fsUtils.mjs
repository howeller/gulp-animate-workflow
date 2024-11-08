/*
	@version: 2.0.0
	@author: 	eric@howellstudio.com
	@desc: 		Helpful file system utilities for Gulp tasks
	@usage: 
    import { fileCheck, getFolders, mkDirByPathSync} from 'fsUtils.js'

		const doesMyFileExist = fileCheck('./myFolder/myFile.js'); // true / false

		const mySrcFolders = getFolders(./myFolder/); // [Array of folder paths]

		const myImagePath = mkDirByPathSync('./myFolder/myImages/'); // Creates 'myFolder/myImages/' if if does not exist
*/

import fs from'fs';
import path from'path';

/*
	Check to see if a property exists in json object
*/
export function propCheck(obj, prop){
	// console.log('propCheck : '+obj._name+' ? '+obj[prop]);
	return (obj[prop]) ? true:false;
}

/*
	Check to see if a file exists
*/
export function fileCheck (_path){
	// console.log(`?	fileCheck ${_path}`);
	try {
		if (fs.existsSync(_path)) {
			return true;
		}
	} catch(err) {
		//console.error(err)
		return false;
	}
}

/*
	Check to see if a directory exists
*/
export function fsExistsSync(dir) {
	try {
		fs.accessSync(dir);
		return true;
	} catch (e) {
		return false;
	}
}

/*
	Check to see if a directory is empty
*/
export function isDirEmpty(dir) {
	if(fsExistsSync(dir)){
		return fs.readdirSync(dir).length === 0;
	}
	return true;
}

/*
	Returns a list sub directories (individual banner/email folders)
*/
export function getFolders(dir) {
	return fs.readdirSync(dir).filter(function(file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
}

/*
	Checks to see if a directory exists and creates it if not.
*/
export function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
	const sep = path.sep;
	const initDir = path.isAbsolute(targetDir) ? sep : '';
	const baseDir = isRelativeToScript ? __dirname : '.';

	return targetDir.split(sep).reduce((parentDir, childDir) => {
		const curDir = path.resolve(baseDir, parentDir, childDir);
		try {
			fs.mkdirSync(curDir);
		} catch (err) {
			if (err.code === 'EEXIST') { 
				// curDir already exists!
				return curDir;
			}
			// To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
			if (err.code === 'ENOENT') { 
				// Throw the original parentDir error on curDir `ENOENT` failure.
				throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
			}
			const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
			if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
				// Throw if it's just the last created dir.
				throw err; 
			}
		}
		return curDir;
	}, initDir);
}