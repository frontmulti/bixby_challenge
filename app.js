var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

var API_ELASTIC = require('./service')('elastic');

app.post('/food', function(req, res) {
    var foodName = req.body.foodName;
    var calorie = req.body.calorie;
    API_ELASTIC.addElasticData(foodName, calorie, function(err, result) {
        if (!err) {
            res.json(result);
        } else {
            res.json(err);
        }
    })
});

app.get('/food', function(req, res) {
    API_ELASTIC.getElasticData('foodName', function(err, result) {
        if (!err) {
            res.json(result);
        } else {
            res.json(err);
        }
    })
})

server.listen(9090, function() {
    console.log('Express server listening on port ' + server.address().port);
});