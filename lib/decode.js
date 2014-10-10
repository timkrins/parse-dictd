var az = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var codes = {};
for (var i = 0; i < 64; i++) codes[az.charAt(i)] = i;

module.exports = function (s) {
    var index = 0, len = s.length;
    for (var i = 0; i < len; i++) {
        index += codes[s.charAt(i)] * Math.pow(64,len-i-1);
    }
    return index;
};
