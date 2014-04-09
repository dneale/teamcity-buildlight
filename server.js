var request = require('request');
var ConfigurationCollection = require('./ConfigurationCollection');
var TeamCityStatusChecker = require('./TeamCityStatusChecker');

var config = {
    'baseUrl': 'http://build.southsidesoft.com:81/',
    'user': 'xxx',
    'pass': 'yyy',
    'configurations': [
        {'id': 'bt2', 'canTurnRed': true },
        {'id': 'bt17', 'canTurnRed': false },
        {'id': 'Autobahn_SeleniumTests', canTurnRed: false }
    ]
};

var configurations = new ConfigurationCollection(config, new TeamCityStatusChecker());
configurations.checkStatus();

setInterval(function(){
    configurations.checkStatus();
}, 10 * 1000);

