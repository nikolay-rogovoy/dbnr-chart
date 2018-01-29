const del = require('del');
var rimraf = require('rimraf');
var fs = require('fs');
var ncp = require('ncp').ncp;

ncp.limit = 16;

(function copy() {
    let path = './dist/';
    let destination = '../wd/node_modules/dbnr-chart/';
    ncp(path, destination, function (err) {
        if (err) {
            return console.error(err);
        }
    });
})();
(function main() {
    //rimraf.sync('dist/node_modules')
})();
