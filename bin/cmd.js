#!/usr/bin/env node

var parse = require('../');
var fs = require('fs');
var minimist = require('minimist');
var gunzip = require('zlib').createGunzip;

var argv = minimist(process.argv.slice(2));
if (argv.help || argv.h) {
    console.log('usage: parse-dictd -i IFILE -d DFILE');
    return process.exit(0);
}
var dfile = argv.d || argv._.shift();
var ifile = argv.i || argv._.shift();
if (!dfile || !ifile) {
    console.error('usage: parse-dictd -i IFILE -d DFILE');
    return process.exit(1);
}

var dstream = fs.createReadStream(dfile).pipe(gunzip())
var istream = fs.createReadStream(ifile);

parse(dstream, istream).on('data', console.log);
process.stdout.on('error', process.exit);
