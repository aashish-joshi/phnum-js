const { src, dest } = require('gulp');

const jsPath = './dist/showBestNumber.min.js';
const destPath = './public';

function copyjs() {
    return src(jsPath)
    .pipe(dest(destPath));
}

exports.copyjs = copyjs;

exports.default = copyjs;