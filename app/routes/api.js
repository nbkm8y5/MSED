var express = require('express');
var apiRouter = express.Router();

// GET /api
apiRouter.get('/', function (req, res) {
    res.json({
        message: 'WELCOME TO MSED API',
        name: 'MSED',
        description: 'Multisport Equipment Dashboard',
        URL: 'http://msed.greasyhacks.com',
        version: '1.0.0'
    });
});

/* GET activities. */
apiRouter.get('/activities', function(req, res, next) {
    res.json({
        "activities":[
            {
                "activityId":51007,
                "activityParentId":90019,
                "calories":230,
                "description":"7mph",
                "distance":2.04,
                "duration":1097053,
                "hasStartTime":true,
                "isFavorite":true,
                "logId":1154701,
                "name":"Treadmill, 0% Incline",
                "startTime":"00:25",
                "steps":3783
            }
        ],
        "goals":{
            "caloriesOut":2826,
            "distance":8.05,
            "floors":150,
            "steps":10000
        },
        "summary":{
            "activityCalories":230,
            "caloriesBMR":1913,
            "caloriesOut":2143,
            "distances":[
                {"activity":"tracker", "distance":1.32},
                {"activity":"loggedActivities", "distance":0},
                {"activity":"total","distance":1.32},
                {"activity":"veryActive", "distance":0.51},
                {"activity":"moderatelyActive", "distance":0.51},
                {"activity":"lightlyActive", "distance":0.51},
                {"activity":"sedentaryActive", "distance":0.51},
                {"activity":"Treadmill, 0% Incline", "distance":3.28}
            ],
            "elevation":48.77,
            "fairlyActiveMinutes":0,
            "floors":16,
            "lightlyActiveMinutes":0,
            "marginalCalories":200,
            "sedentaryMinutes":1166,
            "steps":0,
            "veryActiveMinutes":0
        }
    });
});

module.exports = apiRouter;