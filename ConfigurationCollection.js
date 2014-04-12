var buildStatus = require('./buildStatus');
var Configuration = require('./Configuration');
var async = require('async');

function ConfigurationCollection(config, teamCityStatusChecker, delcomIndicator){
    this.baseUrl = config.baseUrl;
    this.user = config.user;
    this.pass = config.pass;
    this.configurations = [];
    this.teamCityStatusChecker = teamCityStatusChecker;
    this.delcomIndicator = delcomIndicator;

    var self = this;

    config.configurations.forEach(function (configuration, index, array) {
        self.configurations.push(new Configuration(configuration));
    });
}

ConfigurationCollection.prototype.checkStatus = function() {
    var status = buildStatus.status.UNKNOWN;
    var self = this;
    async.each(this.configurations, function (configuration, callback) {
        self.teamCityStatusChecker.checkStatus(configuration, self.baseUrl, self.user, self.pass);
        callback();
    });
};

ConfigurationCollection.prototype.displayStatus = function() {
    var statusToDisplay = buildStatus.status.UNKNOWN;
    var exit = false;

    for (var x = 0; x < this.configurations.length && exit === false; x++){
        var configuration = this.configurations[x];
        if (configuration.lastStatus === buildStatus.status.UNKNOWN){
            statusToDisplay = buildStatus.status.UNKNOWN;
            exit = true;
        } else if (configuration.lastStatus === buildStatus.status.BUILDING){
            statusToDisplay = buildStatus.status.BUILDING;
            exit = true;
        } else if (configuration.lastStatus === buildStatus.status.FAILURE && configuration.canTurnRed) {
            statusToDisplay = buildStatus.status.FAILURE;
            exit = true;
        } else if (configuration.lastStatus === buildStatus.status.SUCCESS){
            statusToDisplay = buildStatus.status.SUCCESS;
        }
    }

    if (statusToDisplay === buildStatus.status.UNKNOWN){
        if (this.delcomIndicator !== undefined) {
            this.delcomIndicator.turnOff();
        }
    } else if (statusToDisplay === buildStatus.status.BUILDING){
        if (this.delcomIndicator !== undefined) {
            this.delcomIndicator.turnOff();
            this.delcomIndicator.flashBlue();
        }
    } else if (statusToDisplay === buildStatus.status.FAILURE){
        if (this.delcomIndicator !== undefined) {
            this.delcomIndicator.turnOff();
            this.delcomIndicator.flashRed();
        }
    } else if (statusToDisplay === buildStatus.status.SUCCESS){
        if (this.delcomIndicator !== undefined) {
            this.delcomIndicator.turnOff();
            this.delcomIndicator.solidGreen();
        }
    }
};

ConfigurationCollection.prototype.dispose = function(){
    if (this.delcomIndicator !== undefined){
        this.delcomIndicator.close();
    }
};

module.exports = ConfigurationCollection;