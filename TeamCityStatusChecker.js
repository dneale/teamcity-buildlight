var request = require('request');
var q = require('q');

function promisify(nodeAsyncFn, context) {
    return function() {
        var defer = q.defer()
            , args = Array.prototype.slice.call(arguments);

        args.push(function(err, val) {
            if (err !== null) {
                return defer.reject(err);
            }

            return defer.resolve(val);
        });

        nodeAsyncFn.apply(context || {}, args);

        return defer.promise;
    };
};

function TeamCityStatusChecker(){

}

TeamCityStatusChecker.prototype.checkStatus = function(configuration, baseUrl, user, pass) {
    var get = promisify(request.get())
    get(baseUrl + 'app/rest/builds/buildType:' + configuration.id + ',branch:default:any,running:any',
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
                //console.log(body);
                console.log(configuration.checkStatus(body))
            }
        });
}

module.exports = TeamCityStatusChecker;