var through = require('through2');
var readonly = require('read-only-stream');
var decode64 = require('./lib/decode.js');
var split = require('split');

module.exports = function(dstream, istream) {
    var offsets = {};
    istream.pipe(split('\n')).pipe(through.obj(iwrite, iend));

    var line = [];
    var absEndPos = null;
    var bufPos = 0;
    var output = through.obj(dwrite);
    return readonly(output);

    function iwrite(buf, enc, next) {
        var fields = buf.toString('utf8').split('\t');
        if (fields.length !== 3) return next();

        var word = fields[0];
        var offset = decode64(fields[1]);
        var size = decode64(fields[2]);
        offsets[offset] = { word: word, size: size };
        next();
    }

    function iend() {
        dstream.pipe(output);
    }

    function dwrite(buf, enc, next) {
        var bufLen = buf.length;

        var relPos = 0;
        while (relPos < bufLen) {
            if (!absEndPos) {
                var offset = offsets[bufPos + relPos];
                var chunkSize = offset.size;
                absEndPos = bufPos + relPos + chunkSize;
            }

            var relEndPos = absEndPos - bufPos;

            if (relEndPos <= bufLen) {
                line.push(buf.slice(relPos, relEndPos));
                process(Buffer.concat(line), relPos + bufPos);
                line = [];
                relPos = relEndPos;
                absEndPos = null;
            } else {
                line.push(buf.slice(relPos, bufLen));
                break;
            }
        }

        bufPos += bufLen;
        next();
    }

    function process(buf, pos) {
        var line = buf.toString('utf8');
        // TODO: split still needs tidying
        var to = line
            .replace(/^\w+:/, '')
            .trim()
            .split(/[,]/);

        if (offsets[pos]) {
            output.push({ from: offsets[pos].word, to: to });
        }
    }
};

function cmp(a, b) {
    return a.offset < b.offset ? -1 : 1;
}

function ncmp(a, b) {
    var na = Number(a),
        nb = Number(b);
    return na < nb ? -1 : 1;
}
