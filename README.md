# gulp-animate-workflow
Packaging HTML banner files built in Adobe Animate for delivery into local OneDrive Folder.

## Dependencies
- [**NodeJs** - latest stable release](https://nodejs.org/en/)
- [**Gulp 5** ~v.5.0.0](https://www.npmjs.com/package/gulp)

## Setup
1) You will need to have [NodeJs](https://nodejs.org/en/), & [Gulp](https://www.npmjs.com/package/gulp) installed globally. Follow the [Quick Start guide](https://gulpjs.com/docs/en/getting-started/quick-start) to get setup. 

2) Clone this repo or copy all contents to the root of your project folder.

3) In Terminal - navigate to your project folder and run `npm install` to download all of the npm packages.

4) Place each banner in a folder named with it's Redtrax name inside the `src/banners/[concept]` directory. The zips & a copy of each HTML file will be created inside the `dist` directory. This task will create the `.zip` and a compressed copy of the HTML, JS & images file(s) into `dist`. Everything you need for final delivery to OneDrive or other location.

Your directory structure should look like this.

```bash
├── gulpfile.js
├── package.json
├── node_modules
├── dist
├── lib
│   └── fsUtils.js
└── src
    ├── banners
    │   ├── Concept1
    │   │  └── Concept1_300x250
    │   │      ├── Concept1_300x250.fla
    │   │      ├── Concept1_300x250.html
    │   │      └── images
    │   └── Concept2
    │      └── Concept2_300x250
    │          ├── Concept2_300x250.fla
    │          ├── Concept2_300x250.html
    │          └── images
    └── global
        └── Animate_Template.html
```
Each banner should go inside a parent folder named with it's concept name. The FLA and exported HTML will be in a directory with its own name. Add as many banner folders as you need. Everything inside `banners/[Concept]` will get processed in the task.


<!-- Anything you wish to have packaged in the `_source.zip` (such as Animate templates, fonts, ect) should be placed inside the `/global` -->

## Tasks

| Task Name | What it Does
| :----: | :---
`clean` | Deletes html and zip files in `./dist` for the `currentGroup`.
`move` | Minifies the HTML and JS and places into the appropriate folder in `./dist`. Runs the `moveAssets` function for the `currentGroup`.
|`od` | Copies all exported HTML and zips into the specified OneDrive folder.
|`zip` | Makes zip files for all banners.
|`pack` | Runs the tasks `clean`, `move`, `zip` and `od`.
|`gulp` | Default task is set to the `move` task.


## Usage

To package everything up for uploading to OneDrive:

```cli
gulp pack
```


