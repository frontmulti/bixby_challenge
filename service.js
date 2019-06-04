var request = require('request');

module.exports = function (callee) {
    function API_CALL(callee) {
        var OPTIONS = {
            headers: {'Content-Type': 'application/json'},
            url: null,
            body: null
        };
        // const PORT = '80';
        // const BASE_PATH = '/rest';
        (function() {
            switch (callee) {
                case 'dev':
                    HOST = '';
                    break;
                case 'prod':
                    HOST = '';
                    break;
                case 'elastic':
                    HOST = 'http://172.104.114.192:9000';
                    break;
                case 'fatsecret':
                    HOST = 'https://platform.fatsecret.com/rest/server.api';
                    break;
                default:
                    HOST = 'http://localhost';
            }
        })(callee);
        return {
            fatsecret_test : function (food_name, callback) {
                OPTIONS.url = HOST;
                OPTIONS.body = JSON.stringify({
                    "food_name": food_name
                });
                request.post(OPTIONS, function (err, res, result) {
                    console.log('res', res);
                    statusCodeErrorHandler(res.statusCode, callback, result);
                })
                
            },
            elastic_test : function (fatsecret_data, calorie, callback) {
                OPTIONS.url = HOST;
                OPTIONS.body = JSON.stringify({
                    //TODO
                });
                request.put(OPTIONS, function (err, res, result) {
                    statusCodeErrorHandler(res.statusCode, callback, result);
                })
            }

        }
    }

    function statusCodeErrorHandler(statusCode, callback, data) {
        switch (statusCode) {
            case 200:
                callback(null, JSON.parse(data));
                break;
            default:
                callback('error', JSON.parse(data));
                break;
        }
    }

    return new API_CALL(callee);
}