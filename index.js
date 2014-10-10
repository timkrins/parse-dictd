var through = require('through2');
var readonly = require('read-only-stream');
var decode64 = require('./lib/decode.js');
var split = require('split');

module.exports = function (dstream, istream) {
    var offsets = {};
    istream.pipe(split('\n')).pipe(through.obj(iwrite, iend));
    
    var pos = 0, line = [];
    var output = through.obj(dwrite);
    return readonly(output);
    
    function iwrite (buf, enc, next) {
        var fields = buf.toString('utf8').split('\t');
        if (fields.length !== 3) return next();
        
        var word = fields[0];
        var offset = decode64(fields[1]);
        var size = decode64(fields[2]); // maybe
        offsets[offset] = { word: word };
        next();
    }
    function iend () {
        dstream.pipe(output);
    }
    
    function dwrite (buf, enc, next) {
        var offset = 0;
        for (var i = 0; i < buf.length; i++) {
            if (buf[i] === 10) {
                line.push(buf.slice(offset, i + 1));
                process(Buffer.concat(line));
                offset = i + 1;
                line = [];
            }
        }
        line.push(buf.slice(offset, i + 1));
        next();
    }
    
    function process (buf) {
        var line = buf.toString('utf8');
        var to = line.replace(/^\w+:/, '').trim().split(',');
        if (offsets[pos]) {
            output.push({ from: offsets[pos].word, to: to });
        }
        pos += buf.length;
    }
};

function cmp (a, b) {
    return a.offset < b.offset ? -1 : 1;
}

function ncmp (a, b) {
    var na = Number(a), nb = Number(b);
    return na < nb ? -1 : 1;
}
