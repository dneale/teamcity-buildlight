var status = require('./buildStatus');

function Configuration(config){

}

Configuration.prototype.checkStatus = function(teamCityStatus) {
    if (teamCityStatus.state === 'running'){
        return status.status.BUILDING;
    }
    return status.status.FAILURE;
}

module.exports = Configuration;