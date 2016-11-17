$(function(){
  $.ajax({
    url: 'http://localhost:3000/steps',
    type: 'GET',
    success : function(data) {
      var chartProperties = {
      "caption": "Steps Taken",
      "subcaption": "In the Past Week",
      "xAxisName": "Date",
      "yAxisName": "Number of Steps"
    };
    var categoriesArray = [{
        "category" : data["categories"]
    }];

    var lineChart = new FusionCharts({
      type: 'msline',
      renderAt: 'chart-steps',
      width: '500',
      height: '400',
      dataFormat: 'json',
      dataSource: {
        chart: chartProperties,
        categories : categoriesArray,
        dataset : data["dataset"]
      }
    });
    lineChart.render();
    }
  });
});
