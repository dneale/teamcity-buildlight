var buildStatus = require('./buildStatus');
var Configuration = require('./Configuration');

function ConfigurationCollection(config, teamCityStatusChecker){
    this.baseUrl = config.baseUrl;
    this.user = config.user;
    this.pass = config.pass;
    this.configurations = [];
    this.teamCityStatusChecker = teamCityStatusChecker;

    var self = this;

    config.configurations.forEach(function (configuration, index, array) {
        self.configurations.push(new Configuration(configuration));
    });
}

ConfigurationCollection.prototype.checkStatus = function() {
    var status = buildStatus.status.UNKNOWN;
    var self = this;
    this.configurations.forEach(function(configuration, index, array){
       self.teamCityStatusChecker.checkStatus(configuration, self.baseUrl, self.user, self.pass)
    });
}

module.exports = ConfigurationCollection;