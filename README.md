# gulp-animatecc-workflow
Packaging HTML banner files built in Animate CC for RedTrax CMS.

## Setup
1) Clone this repo  or copy `gulpfile.js`,`package.json` and `package-lock.json` to the root of your project folder.

2) In Terminal - navigate to your project folder and run `npm install` to download all of the npm packages.

3) Place each banner in a folder named with it's Redtrax name inside the `src/banners` directory. The zips & a copy of each HTML file will be created inside the `dist` directory. This task will create the `_final.zip` and `_source.zip` and a copy of the HTML file inside `dist`. Everything you need for direct upload to RedTrax.

## Tasks

**`zip`** (default)\
Packages the published banner into a `_final.zip` and the source files into the `_source.zip`

## Usage

To package everything up for uploading to RedTrax:

```cli
gulp
```

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
