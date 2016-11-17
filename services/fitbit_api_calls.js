  const request = require('request');
  const calls = ['activities/distance/date/today/7d.json',
                 'activities/steps/date/today/7d.json'
                ];
  // const api_call_one = 'sleep/date/today.json'
  // const api_call_four = 'activities/calories/date/today/7d.json'
  // const api_call_five = 'activities/minutesSedentary/date/today/7d.json'
  function init_api_calls(auth_token) {
    for (i = 0; i < calls.length; i++) {
      request({
        headers: {
          'Authorization': 'Bearer ' + auth_token
          },
          uri: 'https://api.fitbit.com/1/user/-/' + calls[i],
          method: 'GET'
        }, function (err, resp, object) {
            console.log(object);
              require('./fusioncharts_api').set_data(object, resp);
            });
    }

  }

module.exports = {
  init_api_calls: init_api_calls
}

    //api_call(api_call_one);
    // api_call(api_call_two);
    // api_call(api_call_three);
    // api_call(api_call_four);
    // api_call(api_call_five);
