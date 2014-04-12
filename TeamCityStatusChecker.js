var request = require('request');

function TeamCityStatusChecker(){

}

TeamCityStatusChecker.prototype.checkStatus = function(configuration, baseUrl, user, pass) {
    request.get(baseUrl + 'app/rest/builds/buildType:' + configuration.id + ',branch:default:any,running:any',
        {
            'auth': {
                'user': user,
                'pass': pass,
                'sendImmediately': false
            },
            'json': true
        },
        function(error, response, body){
            if (!error && response.statusCode == 200){
                console.log(configuration.checkStatus(body));
            } else {
                console.log("Error on " + configuration.id + " status " + response.statusCode + " " + error)
            }
        });
}

module.exports = TeamCityStatusChecker;