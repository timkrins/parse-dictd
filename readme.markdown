# parse-dictd

parse dictd files (.dict.dz and .index)

# example

``` js
var parse = require('parse-dictd');
var fs = require('fs');
var gunzip = require('zlib').createGunzip;

var dstream = fs.createReadStream(process.argv[2]).pipe(gunzip());
var istream = fs.createReadStream(process.argv[3]);

parse(dstream, istream).on('data', console.log);
process.stdout.on('error', process.exit);
```

To run this example, you'll need a `.dict.dz` and `.index` file. You can grab
one of the `dict-` packages on a debian system, for example:

```
sudo apt-get install dict-stardic
```

to grab an english to chinese dictd dictionary.

```
$ node example/dict.js /usr/share/dictd/stardic.{dict.dz,index} | head -n30
{ from: '00databasedictfmt11011',
  to: [ '00-database-dictfmt-1.10.11' ] }
{ from: '00databaseshort', to: [ '00-database-short' ] }
{ from: 'qi', to: [ 'n.气(中医)' ] }
{ from: 'be able to', to: [ '能够' ] }
{ from: 'be busy with', to: [ '忙于' ] }
{ from: 'be good at', to: [ '在.方面(学得)好', '善于' ] }
{ from: 'bedifferent from', to: [ '和...不同' ] }
{ from: 'get close to', to: [ '接近' ] }
{ from: 'go on the stage', to: [ '当演员' ] }
{ from: 'notat all', to: [ '根本(不)' ] }
{ from: '100metre race', to: [ '100米(赛跑)' ] }
{ from: 'a', to: [ 'art. 一;' ] }
{ from: 'a basin of', to: [ '一盆...' ] }
{ from: 'a beam of light', to: [ '一束光' ] }
{ from: 'a bill of fare', to: [ '菜单；节目单' ] }
{ from: 'a bit', to: [ '有一点儿' ] }
{ from: 'a bit of', to: [ '一点' ] }
{ from: 'a blanket of', to: [ '一片或一页的' ] }
{ from: 'a blast of', to: [ '一阵风' ] }
{ from: 'a block of', to: [ '一大块...' ] }
{ from: 'a bottle of', to: [ '一瓶' ] }
{ from: 'a bowl of', to: [ '一碗…' ] }
{ from: 'a burning desire', to: [ '强烈的愿望' ] }
{ from: 'a burst of laughter', to: [ '爆发一阵笑声' ] }
{ from: 'a case in point', to: [ '一个恰当的例子' ] }
{ from: 'a chemists shop', to: [ '药房' ] }
{ from: 'a close game', to: [ '势均力敌的比赛' ] }
{ from: 'a cluster of', to: [ '一群；一组' ] }
{ from: 'a column of water', to: [ '水柱' ] }
```

# methods


``` js
var parse = require('parse-dictd')
```

## var r = parse(dstream, istream)

Return a readable object stream `r` that parses two input streams:

* `dstream` - an uncompressed stream of `.dict.dz` data
* `istream` - a stream of `.index` data

`r` generates output as objects with `from` and `to` properties.

# install

With [npm](https://npmjs.org) do:

```
npm install parse-dictd
```

# license

MIT
