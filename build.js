const fs = require('fs');
const concat = require('concat');
const uglify = require('uglify-js');

const jsFiles = [
  './public/js/file1.js',
  './public/js/file2.js',
  './public/js/file3.js'
];

const cssFiles = [
  './public/css/style1.css',
  './public/css/style2.css'
];

concat(jsFiles).then((result) => {
  fs.writeFileSync('./public/js/bundle.js', uglify.minify(result).code);
});

concat(cssFiles).then((result) => {
  fs.writeFileSync('./public/css/bundle.css', result);
});
