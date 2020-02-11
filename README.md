# gulp-animatecc-workflow
Packaging HTML banner files built in Animate CC for RedTrax CMS.

## Dependencies
**npm**

```cli
merge-stream
path
gulp
gulp-rename
gulp-zip
```

**Custom utility**
```cli
fsUtils.js
```

## Setup
1) Clone this repo  or copy `gulpfile.js`,`package.json` and `package-lock.json` to the root of your project folder.

2) In Terminal - navigate to your project folder and run `npm install` to download all of the npm packages.

3) Place each banner in a folder named with it's Redtrax name inside the `src` directory. Set that banner to publish into the `dist` directory. Publishing will make a folder with a duplicate name inside `dist`

## Tasks

**`zip`** (default)\
Packages the published banner into a `_final.zip` and the source files into the `_source.zip`

## Usage

To rename the files and create the RedTrax `_final` and `_source` zips:

```cli
gulp
```
