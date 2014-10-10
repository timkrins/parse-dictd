var through = require('through2');
var split = require('split');
var readonly = require('readonly');

module.exports = function (dstream, istream) {
    var indexes = {};
    istream.pipe(split()).pipe(through.obj(iwrite, iend));
    
    var output = through.obj();
    var pos = 0;
    return readonly(output);
    
    function iwrite (buf, enc, next) {
        var fields = buf.toString('utf8').split('\t');
        var word = fields[0];
        var offset = decode(fields[1]);
        var size = decode(fields[2]); // maybe
        indexes[offset] = word;
        next();
    }
    function iend () {
        dstream.pipe(split('\n')).pipe(through.obj(dwrite, dend));
    }
    
    function dwrite (buf, enc, next) {
        var line = buf.toString('utf8');
        if (indexes[pos]) {
            console.log('line=', line, 'word=', indexes[pos]);
        }
        pos += buf.length + 1;
        next();
    }
};

function decode64 (s) {
    if (s.length === 1) s += 'A';
    var buf = Buffer(s, 'base64');
    var index = 0, len = buf.length;;
    for (var i = 0; i < len; i++) {
        index += Math.pow(256,len-i-1) * buf[i];
    }
    return index;
}
