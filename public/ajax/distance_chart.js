$(function(){
  $.ajax({
    url: 'http://localhost:3000/distance',
    type: 'GET',
    success : function(data) {
      var chartProperties = {
      "caption": "Distance Travelled",
      "subcaption": "In the Past Week",
      "xAxisName": "Date",
      "yAxisName": "Miles"
    };
    var categoriesArray = [{
        "category" : data["categories"]
    }];

    var lineChart = new FusionCharts({
      type: 'msline',
      renderAt: 'chart-location',
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
