var express = require('express');
var activities = require("./dashboardController.js");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      {
        title: 'MSED',
        name: 'Rolando Moreno',


      });
});

// GET Dashboard page
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {
      title: 'MSED Dashboard',
      activitiesObj : activities.getActivities()
  });

});

module.exports = router;
