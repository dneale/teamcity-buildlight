"use strict";

var buildStatus = require('./buildStatus');
var Configuration = require('./Configuration');
var async = require('async');

class ConfigurationCollection {
  constructor(config, teamCityStatusChecker, delcomIndicator)
  {
    this.baseUrl = config.baseUrl;
    this.user = config.user || process.env.TEAM_CITY_USER;
    this.pass = config.pass || process.env.TEAM_CITY_PASS;
    this.configurations = [];
    this.teamCityStatusChecker = teamCityStatusChecker;
    this.delcomIndicator = delcomIndicator;
    this.lastStatus = undefined;

    var self = this;

    config.configurations.forEach(function (configuration, index, array) {
      self.configurations.push(new Configuration(configuration));
    });
  }

  checkStatus() {
    var status = buildStatus.status.UNKNOWN;
    var self = this;
    async.each(this.configurations, function (configuration, callback) {
      self.teamCityStatusChecker.checkStatus(configuration, self.baseUrl, self.user, self.pass);
      callback();
    });
  }

  displayStatus() {
    var statusToDisplay = buildStatus.status.UNKNOWN;
    var exit = false;

    for (var x = 0; x < this.configurations.length && exit === false; x++) {
      var configuration = this.configurations[x];
      if (configuration.lastStatus === buildStatus.status.UNKNOWN) {
        statusToDisplay = buildStatus.status.UNKNOWN;
        exit = true;
      } else if (configuration.lastStatus === buildStatus.status.BUILDING) {
        statusToDisplay = buildStatus.status.BUILDING;
        exit = true;
      } else if (configuration.lastStatus === buildStatus.status.FAILURE && configuration.canTurnRed) {
        statusToDisplay = buildStatus.status.FAILURE;
        exit = true;
      } else if (configuration.lastStatus === buildStatus.status.SUCCESS) {
        statusToDisplay = buildStatus.status.SUCCESS;
      }
    }

    if (statusToDisplay === buildStatus.status.UNKNOWN && this.lastStatus !== buildStatus.status.UNKNOWN) {
      this.lastStatus = buildStatus.status.UNKNOWN;
      if (this.delcomIndicator !== undefined && this.delcomIndicator.isOpen()) {
        this.delcomIndicator.turnOff();
      } else {
        console.log('DELCOM NOT CONNECTED: Light Off');
      }
    } else if (statusToDisplay === buildStatus.status.BUILDING && this.lastStatus !== buildStatus.status.BUILDING) {
      this.lastStatus = buildStatus.status.BUILDING;
      if (this.delcomIndicator !== undefined && this.delcomIndicator.isOpen()) {
        this.delcomIndicator.turnOff();
        this.delcomIndicator.flashBlue();
      }else {
        console.log('DELCOM NOT CONNECTED: Flash Blue');
      }
    } else if (statusToDisplay === buildStatus.status.FAILURE && this.lastStatus !== buildStatus.status.FAILURE) {
      this.lastStatus = buildStatus.status.FAILURE;
      if (this.delcomIndicator !== undefined && this.delcomIndicator.isOpen()) {
        this.delcomIndicator.turnOff();
        this.delcomIndicator.flashRed();
      } else {
        console.log('DELCOM NOT CONNECTED: Flash Red');
      }
    } else if (statusToDisplay === buildStatus.status.SUCCESS && this.lastStatus !== buildStatus.status.SUCCESS) {
      this.lastStatus = buildStatus.status.SUCCESS;
      if (this.delcomIndicator !== undefined && this.delcomIndicator.isOpen()) {
        this.delcomIndicator.turnOff();
        this.delcomIndicator.solidGreen();
      }else {
        console.log('DELCOM NOT CONNECTED: Solid Green');
      }
    }
  }

  dispose(){
    if (this.delcomIndicator !== undefined && this.delcomIndicator.isOpen()) {
      this.delcomIndicator.close();
    }
  }
}

module.exports = ConfigurationCollection;
