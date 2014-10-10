#!/usr/bin/env node

var parse = require('../');
var fs = require('fs');
var minimsit = require('minimist');
var gunzip = require('zlib').createGunzip;

var argv = minimist(process.argv.slice(2));
if (argv.help || argv.h) {
    console.log('usage: parse-dictd -i IFILE -d DFILE');
    return process.exit(0);
}
if (!argv.d || !argv.i) {
    console.error('usage: parse-dictd -i IFILE -d DFILE');
    return process.exit(1);
}

var dstream = fs.createReadStream(argv.d || arg._.shift())
    .pipe(gunzip())
;
var istream = fs.createReadStream(argv.i || argv._.shift();

parse(dstream, istream).on('data', console.log);
process.stdout.on('error', process.exit);
