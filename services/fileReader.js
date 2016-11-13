fs = require('fs');

var nodeServerLog = '/Users/nbkm8y5/School/CEN 4083/msed/npm-debug.log';
var linuxSystemLog = '/var/log/system.log';
var encoding = 'utf8';
var nodeServerLogContents, linuxSystemLogContents;

fs.readFile(nodeServerLog, encoding, function (err, data) {
    if (err) {
        return console.log(err);
    }
    // console.log(data);
    nodeServerLogContents = data;

});

fs.readFile(linuxSystemLog, encoding, function (err, data) {
    if (err) {
        return console.log(err);
    }
    // console.log(data);
    linuxSystemLogContents = data;

});

exports.getNodeServerInfo = function () {
    return nodeServerLogContents;
}

exports.getLinuxSystemInfo = function () {
    return linuxSystemLogContents;
}