var status = require('./buildStatus');

function Configuration(config){
    this.id = config.id;
    this.canTurnRed = config.canTurnRed;

}

Configuration.prototype.checkStatus = function(teamCityStatus) {
    if (teamCityStatus.state === 'running'){
        return status.status.BUILDING;
    }
    return status.status.FAILURE;
}

module.exports = Configuration;