const { src, dest } = require('gulp');
const zip = require('gulp-zip');

const outPath = 'release-assets';
const inputFiles = ['./dist/showBestNumber.min.js', './README.md', './LICENSE'];

function assets() {
    return src(inputFiles)
    .pipe(zip('showBestNumber.zip'))
    .pipe(dest(outPath));
}

exports.default = assets;