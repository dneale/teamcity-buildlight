var request = require('request');
var ConfigurationCollection = require('./ConfigurationCollection');
var TeamCityStatusChecker = require('./TeamCityStatusChecker');
var DelcomIndicator = require('delcom-indicator');

var pollInterval = 10 * 1000;
var lightDelay = 5 * 1000;

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

var delcomIndicator = new DelcomIndicator();
delcomIndicator.turnOff();

var configurations = new ConfigurationCollection(config, new TeamCityStatusChecker(), delcomIndicator);
checkStatusAndSetLight();

setInterval(function(){
    checkStatusAndSetLight();
}, pollInterval);

function checkStatusAndSetLight(){
    configurations.checkStatus();
    setInterval(function(){
        configurations.displayStatus();
    }, lightDelay);
}



