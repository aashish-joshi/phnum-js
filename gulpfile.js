const { src, dest } = require('gulp');
const zip = require('gulp-zip');

const outPath = 'release-assets';
const inputFiles = ['./dist/showBestNumber.min.js', './README.md', './LICENSE'];

function assets() {
    return src(inputFiles)
    .pipe(zip('showBestNumber.zip'))
    .pipe(dest(outPath));
}

function copyToDev() {
    return src(inputFiles[0])
    .pipe(dest('./dev/'))
}

exports.dev = copyToDev;
exports.default = assets;
