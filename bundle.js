var browserify = require('browserify');
var factor = require('factor-bundle');
var path = require('path');
var thr = require('through2');
var fs = require('fs');

var entries = ['./a.js', './b.js'];
var basedir = path.join(__dirname, 'src');
var outputs = [thr(), thr()];

browserify(entries, { basedir: basedir })
  .plugin(factor, {
    entries: entries,
    outputs: outputs,
    basedir: basedir,
  })
  .bundle()
  .pipe(dest('common.js'))
  .pipe(process.stdout)
;

outputs[0]
  .pipe(dest('a.js'))
  .pipe(process.stdout);
outputs[1]
  .pipe(dest('b.js'))
  .pipe(process.stdout);

function dest(file) {
  var stream = thr();
  stream.pipe(fs.createWriteStream(path.join('build', file)));
  return stream;
}
