var parse = require('../');
var fs = require('fs');
var gunzip = require('zlib').createGunzip;

var dstream = fs.createReadStream(process.argv[2]).pipe(gunzip());
var istream = fs.createReadStream(process.argv[3]);

parse(dstream, istream).on('data', console.log);
process.stdout.on('error', process.exit);
