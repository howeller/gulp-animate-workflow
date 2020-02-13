# gulp-animatecc-workflow
Packaging HTML banner files built in Animate CC for RedTrax CMS.

## Dependencies
- [**NodeJs** - latest stable release](https://nodejs.org/en/)
- [**gulp** ~v.4.0.0](https://www.npmjs.com/package/gulp)

## Setup
1) You will need to have [NodeJs](https://nodejs.org/en/), & [Gulp](https://www.npmjs.com/package/gulp) installed globally. Follow the [Quick Start guide](https://gulpjs.com/docs/en/getting-started/quick-start) to get setup. 

2) Clone this repo or copy all contents to the root of your project folder.

3) In Terminal - navigate to your project folder and run `npm install` to download all of the npm packages.

4) Place each banner in a folder named with it's Redtrax name inside the `src/banners` directory. The zips & a copy of each HTML file will be created inside the `dist` directory. This task will create the `_final.zip` and `_source.zip` and a copy of the HTML file inside `dist`. Everything you need for direct upload to RedTrax.

Your directory structure should look like this.

```bash
├── gulpfile.js
├── package.json
├── dist
├── lib
│   └── fsUtils.js
└── src
    ├── banners
    │   └── banner_300x250
    │       ├── banner_300x250.fla
    │       ├── banner_300x250.html
    │       └── images
    └── global
        └── Animate_Template.html
```
Each banner should go inside a folder named with it's RedTrax name. For example `banner_300x250` will get renamed with your RedTrax banner name. Add as many banner folders as you need. Everything inside `banners` will get processed in the task.

Anything you wish to have packaged in the `_source.zip` (such as Animate templates, fonts, ect) should be placed inside the `/global`

## Tasks

**`zip`** (default)\
Packages the published banner into a `_final.zip` and the source files into the `_source.zip`

## Usage

To package everything up for uploading to RedTrax:

```cli
gulp
```


