var parse = require('../');
var fs = require('fs');
var zlib = require('zlib');

var dstream = fs.createReadStream(process.argv[2])
    .pipe(zlib.createGunzip())
;
var istream = fs.createReadStream(process.argv[3]);

parse(dstream, istream).on('data', console.log);
