var request = require('request');
var ConfigurationCollection = require('./ConfigurationCollection');
var TeamCityStatusChecker = require('./TeamCityStatusChecker');
var DelcomIndicator = require('delcom-indicator');
var config = require('./config.json');

var pollInterval = 10 * 1000;
var lightDelay = 5 * 1000;

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



