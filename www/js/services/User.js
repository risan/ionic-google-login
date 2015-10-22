'use strict';

angular.module('app.Services').service('User', ['Google', function(Google) {

  this.login = function(successCallback, errorCallback) {
    Google.getAccessToken(function(accessToken) {
      Google.getUser(accessToken, function(user) {
        successCallback(user);
      }, function(error) {
        errorCallback(error.message);
      });
    }, function(error) {
      errorCallback(error);
    });
  }

}]);
