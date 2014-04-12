var status = require('./buildStatus');

function Configuration(config){
    this.id = config.id;
    this.canTurnRed = config.canTurnRed;
    this.lastStatus = status.status.UNKNOWN;

}

Configuration.prototype.checkStatus = function(teamCityStatus) {
    this.lastStatus = status.status.UNKNOWN;

    if (teamCityStatus === undefined){
        this.lastStatus = status.status.UNKNOWN;
    } else if (teamCityStatus.state === 'running'){
        this.lastStatus = status.status.BUILDING;
    } else if (teamCityStatus.state === 'finished' && teamCityStatus.status === 'SUCCESS'){
        this.lastStatus = status.status.SUCCESS;
    } else if (teamCityStatus.state === 'finished' && teamCityStatus.status === 'FAILURE'){
        this.lastStatus = status.status.FAILURE;
    }

    return this.lastStatus;
}

module.exports = Configuration;