var express = require('express');
var adminRouter = express.Router();

// GET Admin page
adminRouter.get('/', function(req, res, next) {
    res.render('admin', { title: 'MSED Admin' });
});

module.exports = adminRouter;