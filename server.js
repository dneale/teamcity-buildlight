var request = require('request');
var Configuration = require('./Configuration');

var config = {
    'baseUrl': 'http://build.southsidesoft.com:81/',
    'user': 'tcabanski',
    'pass': 'xxx',
    'configurations': [
        {'id': 'bt2', 'canTurnRed': true },
        {'id': 'bt17', 'canTurnRed': false }
    ]
};

var configurations = [];

config.configurations.forEach(function poll(element, index, array) {
    configurations.push(new Configuration(element));

    request.get(config.baseUrl + 'app/rest/builds/buildType:' + element.id + ',branch:default:any,running:any',
        {
            'auth': {
                'user': config.user,
                'pass': config.pass,
                'sendImmediately': false
            },
            'json': true
        },
        function(error, response, body){
            if (!error && response.statusCode == 200){
                console.log(body);
            }
        });
});

configurations.forEach(function poll(configuration, index, array) {
    console.log(configuration.checkStatus());
})

