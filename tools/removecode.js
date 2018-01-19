const del = require('del');
var rimraf = require('rimraf');
var fs = require('fs');
var ncp = require('ncp').ncp;

ncp.limit = 16;

(function copy() {
    let path = './dist/tmp/lib-inlined/';
    let destination = './dist/';
    ncp(path, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        del(['dist/*ngfactory.js'])
            .then(del(['dist/node_modules']))
            .then(del(['dist/tmp']))
            .then(del(['dist/*ngsummary.json']))
            .then(del(['dist/*ngfactory.js.map']))
            .then(del(['dist/*ngfactory.d.ts']))
            .then(paths => {
                console.log('Files and folders that would be deleted:\n', paths.join('\n'));
            });
    });
})();
(function main() {
    //rimraf.sync('dist/node_modules')
})();
