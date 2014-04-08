var status = require('./buildStatus');

function Configuration(config){
    this.id = config.id;
    this.canTurnRed = config.canTurnRed;

}

Configuration.prototype.checkStatus = function(teamCityStatus) {
    if (teamCityStatus === undefined){
        return status.status.UNKNOWN;
    }
    if (teamCityStatus.state === 'running'){
        return status.status.BUILDING;
    }
    if (teamCityStatus.state === 'finished' && teamCityStatus.status === 'SUCCESS'){
        return status.status.SUCCESS;
    }
    if (teamCityStatus.state === 'finished' && teamCityStatus.status === 'FAILURE'){
        return status.status.FAILURE;
    }

    return status.status.UNKNOWN;
}

module.exports = Configuration;