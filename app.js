var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

var API_FATSECRET = require('./service')('fatsecret');
var API_ELASTIC = require('./service')('elastic');

app.get('/', function(req, res) {
    
    API_FATSECRET.fatsecret_test('test', function(err, result) {
        if (!err) {
            res.json(result);
        } else {
            res.json(err);
        }
    })
});

server.listen(9090, function() {
    console.log('Express server listening on port ' + server.address().port);
});