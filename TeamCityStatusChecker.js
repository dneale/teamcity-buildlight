"use strict";

var request = require('request');

class TeamCityStatusChecker {
  checkStatus(configuration, baseUrl, user, pass) {
    var url = baseUrl + 'app/rest/builds/buildType:' + configuration.id + ',branch:default:any,running:any';
    console.log("request to: " + url);
    request.get(url,
      {
        'auth': {
          'user': user,
          'pass': pass,
          'sendImmediately': false
        },
        'json': true
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(configuration.checkStatus(body));
        } else {
          console.log("Error on " + configuration.id + " status " + response.statusCode + " " + error)
        }
      });
  }
}

module.exports = TeamCityStatusChecker;