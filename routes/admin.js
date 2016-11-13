var express = require('express');
var fileReader = require("../services/fileReader.js");
var adminRouter = express.Router();


// GET Admin page
adminRouter.get('/', function(req, res, next) {
    res.render('admin', { title: 'MSED Admin' });
});

// GET Admin page
adminRouter.get('/node', function(req, res, next) {
    res.render('node', {
        title: 'MSED Node Server Log',
        nodeServerLog : fileReader.getNodeServerInfo()
    });
});

// GET Admin page
adminRouter.get('/linux', function(req, res, next) {
    res.render('linux', {
        title: 'MSED Linux Server Log',
        linuxSystemLog : fileReader.getLinuxSystemInfo()
    });
});

module.exports = adminRouter;