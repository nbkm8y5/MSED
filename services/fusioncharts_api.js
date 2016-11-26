var data = [];
function set_data(object) {
    data.push(object);
}
function set_chart_data(res) {
    var days_array = [];
    var distance = [];
    JSON.parse(data[0], (key, value) = > {
        if (typeof value === 'string'
)
    {
        if (key != 'value')
            days_array.push({"label": value})
        else
            distance.push({"value": value})
    }
})
    ;
    var dataset = [
        {
            "seriesname": "Distance",
            "data": distance
        }
    ]
    var response = {
        "dataset": dataset,
        "categories": days_array
    };
    console.log(dataset);
    console.log(days_array);
    res.json(response);

}
function set_steps_data(res) {
    var days_array = [];
    var distance = [];
    JSON.parse(data[1], (key, value) = > {
        if (typeof value === 'string'
)
    {
        if (key != 'value')
            days_array.push({"label": value})
        else
            distance.push({"value": value})
    }
})
    ;
    var dataset = [
        {
            "seriesname": "Steps",
            "data": distance
        }
    ]
    var response = {
        "dataset": dataset,
        "categories": days_array
    };
    res.json(response);
}

module.exports = {
    set_data: set_data,
    set_chart_data: set_chart_data,
    set_steps_data: set_steps_data
}
